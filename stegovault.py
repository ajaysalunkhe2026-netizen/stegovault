import os
import numpy as np
from PIL import Image
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import sys

def derive_key(password: str, salt=None):
    if salt is None:
        salt = os.urandom(16)
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=100000, backend=default_backend())
    return kdf.derive(password.encode()), salt

def encrypt_data(data: bytes, password: str):
    key, salt = derive_key(password)
    iv = os.urandom(16)
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    pad = 16 - (len(data) % 16)
    padded = data + bytes([pad] * pad)
    encrypted = encryptor.update(padded) + encryptor.finalize()
    return salt + iv + encrypted

def decrypt_data(encrypted_data: bytes, password: str):
    if len(encrypted_data) < 32:
        raise ValueError("Invalid data")
    salt = bytes(encrypted_data[:16])
    iv = bytes(encrypted_data[16:32])
    ciphertext = bytes(encrypted_data[32:])
    key, _ = derive_key(password, salt)
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    decrypted_padded = decryptor.update(ciphertext) + decryptor.finalize()
    pad_length = decrypted_padded[-1]
    if not (1 <= pad_length <= 16):
        raise ValueError("Invalid padding")
    return decrypted_padded[:-pad_length]

def hide_in_image(data: bytes, cover_path: str, output_path: str):
    cover = Image.open(cover_path).convert('RGB')
    arr = np.array(cover, dtype=np.uint8).flatten()
    length = len(data).to_bytes(4, 'big')
    full_data = length + data
    bits = np.unpackbits(np.frombuffer(full_data, dtype=np.uint8))
    if len(bits) > len(arr):
        print("❌ Cover image chhoti hai. Badi cover use karo.")
        return
    arr[:len(bits)] = (arr[:len(bits)] & 0xFE) | bits
    h, w = Image.open(cover_path).size
    new_img = Image.fromarray(arr.reshape(h, w, 3))
    new_img.save(output_path, quality=95)
    print(f"✅ Encrypted Image Saved: {output_path}")

def extract_from_image(stego_path: str):
    img = Image.open(stego_path).convert('RGB')
    arr = np.array(img, dtype=np.uint8).flatten()
    bits = arr & 1
    byte_data = np.packbits(bits).tobytes()
    if len(byte_data) < 4:
        raise ValueError("No hidden data found")
    length = int.from_bytes(byte_data[:4], 'big')
    return byte_data[4:4+length]

def main():
    print("=== StegoVault - Secure Image Hider ===\n")
    if len(sys.argv) < 4:
        print("Usage:")
        print("  Encrypt: python stegovault.py encrypt <original> <cover> <password>")
        print("  Decrypt: python stegovault.py decrypt <stego_image> <password>")
        return

    if sys.argv[1] == "encrypt":
        with open(sys.argv[2], "rb") as f:
            data = f.read()
        encrypted = encrypt_data(data, sys.argv[4])
        hide_in_image(encrypted, sys.argv[3], "stegovault_encrypted.png")

    elif sys.argv[1] == "decrypt":
        extracted = extract_from_image(sys.argv[2])
        original_data = decrypt_data(extracted, sys.argv[3])
        with open("decrypted_original.png", "wb") as f:
            f.write(original_data)
        print("✅ Decryption Successful! File saved as decrypted_original.png")
        try:
            img = Image.open("decrypted_original.png")
            print(f"Verified: {img.size}, Mode: {img.mode}")
        except:
            pass
    else:
        print("Invalid command. Use 'encrypt' or 'decrypt'")

if __name__ == "__main__":
    main()