import os
from PIL import Image
import numpy as np
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import hashlib
from io import BytesIO

def derive_key(password: str) -> bytes:
    return hashlib.sha256(password.encode()).digest()

def encrypt_data(data: bytes, password: str) -> bytes:
    key = derive_key(password)
    iv = os.urandom(16)
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data) + padder.finalize()
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    return iv + encryptor.update(padded_data) + encryptor.finalize()

def hide_data_in_image(cover_img: Image.Image, data: bytes) -> Image.Image:
    img_array = np.array(cover_img)
    flat = img_array.flatten()
    binary_data = ''.join(format(byte, '08b') for byte in data)
    
    if len(binary_data) > len(flat):
        raise ValueError("Cover image too small!")
    
    for i in range(len(binary_data)):
        flat[i] = (flat[i] & 0xFE) | int(binary_data[i])
    
    return Image.fromarray(flat.reshape(img_array.shape).astype('uint8'))

def encrypt_image(original_path, cover_path, password, output_path=None):
    original_img = Image.open(original_path).convert("RGB")
    cover_img = Image.open(cover_path).convert("RGB")

    # Convert original to bytes
    buffer = BytesIO()
    original_img.save(buffer, format="PNG")
    original_bytes = buffer.getvalue()

    # Encrypt
    encrypted_data = encrypt_data(original_bytes, password)

    # Hide data
    final_img = hide_data_in_image(cover_img, encrypted_data)

    # Force JPG output
    if output_path is None:
        base = os.path.splitext(cover_path)[0]
        output_path = f"{base}_encrypted.jpg"

    final_img.save(output_path, format="JPEG", quality=90)
    return output_path

# ==================== CLI ====================
if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python stegovault.py encrypt <original> <cover> <password>")
        sys.exit(1)
    
    if sys.argv[1] == "encrypt":
        result = encrypt_image(sys.argv[2], sys.argv[3], sys.argv[4])
        print(f"✅ Encrypted JPG Saved: {result}")