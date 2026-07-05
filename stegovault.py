import os
from PIL import Image
import numpy as np
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import hashlib

def derive_key(password: str) -> bytes:
    """Derive 32-byte key from password using SHA-256"""
    return hashlib.sha256(password.encode()).digest()

def encrypt_data(data: bytes, password: str) -> bytes:
    """Encrypt data using AES-256-CBC"""
    key = derive_key(password)
    iv = os.urandom(16)
    padder = padding.PKCS7(128).padder()
    padded_data = padder.update(data) + padder.finalize()
    
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()
    encrypted = encryptor.update(padded_data) + encryptor.finalize()
    return iv + encrypted

def decrypt_data(encrypted_data: bytes, password: str) -> bytes:
    """Decrypt data using AES-256-CBC"""
    key = derive_key(password)
    iv = encrypted_data[:16]
    ciphertext = encrypted_data[16:]
    
    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    decryptor = cipher.decryptor()
    padded_data = decryptor.update(ciphertext) + decryptor.finalize()
    
    unpadder = padding.PKCS7(128).unpadder()
    return unpadder.update(padded_data) + unpadder.finalize()

def hide_data_in_image(cover_img: Image.Image, data: bytes) -> Image.Image:
    """Hide data inside image using LSB"""
    img_array = np.array(cover_img)
    flat = img_array.flatten()
    
    if len(data) * 8 > len(flat):
        raise ValueError("Image too small to hide this data")
    
    binary_data = ''.join(format(byte, '08b') for byte in data)
    
    for i, bit in enumerate(binary_data):
        flat[i] = (flat[i] & 0xFE) | int(bit)
    
    img_array = flat.reshape(img_array.shape)
    return Image.fromarray(img_array.astype('uint8'))

def extract_data_from_image(img: Image.Image, data_length: int) -> bytes:
    """Extract hidden data from image"""
    img_array = np.array(img).flatten()
    binary_data = ''.join(str(pixel & 1) for pixel in img_array[:data_length * 8])
    return bytes(int(binary_data[i:i+8], 2) for i in range(0, len(binary_data), 8))

# ==================== MAIN FUNCTIONS ====================

def encrypt_image(original_path: str, cover_path: str, password: str, output_path: str = None):
    """Encrypt original image and hide it inside cover image. Output = JPG"""
    
    # Load images
    original_img = Image.open(original_path).convert("RGB")
    cover_img = Image.open(cover_path).convert("RGB")

    # Convert original image to bytes
    from io import BytesIO
    buffer = BytesIO()
    original_img.save(buffer, format="PNG")
    original_bytes = buffer.getvalue()

    # Encrypt the data
    encrypted_data = encrypt_data(original_bytes, password)

    # Hide encrypted data inside cover image
    final_img = hide_data_in_image(cover_img, encrypted_data)

    # Save as JPG
    if output_path is None:
        base_name = os.path.splitext(cover_path)[0]
        output_path = f"{base_name}_encrypted.jpg"

    final_img.save(output_path, format="JPEG", quality=92)
    return output_path


def decrypt_image(encrypted_path: str, password: str, output_path: str = None):
    """Decrypt hidden image from encrypted image"""
    
    img = Image.open(encrypted_path).convert("RGB")
    
    # Extract hidden data (we need to know original data length)
    # For simplicity, we extract a fixed large chunk and trim later
    extracted = extract_data_from_image(img, 500000)  # Adjust size as needed
    
    # Decrypt
    decrypted_data = decrypt_data(extracted, password)
    
    # Save decrypted image
    if output_path is None:
        base_name = os.path.splitext(encrypted_path)[0]
        output_path = f"{base_name}_decrypted.png"
    
    with open(output_path, "wb") as f:
        f.write(decrypted_data)
    
    return output_path


# ==================== CLI USAGE ====================

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python stegovault.py encrypt <original> <cover> <password>")
        print("  python stegovault.py decrypt <encrypted> <password>")
        sys.exit(1)
    
    mode = sys.argv[1]
    
    if mode == "encrypt":
        if len(sys.argv) != 5:
            print("Usage: python stegovault.py encrypt <original_image> <cover_image> <password>")
            sys.exit(1)
        result = encrypt_image(sys.argv[2], sys.argv[3], sys.argv[4])
        print(f"✅ Encrypted Image Saved: {result}")
    
    elif mode == "decrypt":
        if len(sys.argv) != 4:
            print("Usage: python stegovault.py decrypt <encrypted_image> <password>")
            sys.exit(1)
        result = decrypt_image(sys.argv[2], sys.argv[3])
        print(f"✅ Decryption Successful! File saved as {result}")