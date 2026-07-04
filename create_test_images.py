from PIL import Image, ImageDraw, ImageFont

# Cover Image (Normal wali)
cover = Image.new("RGB", (600, 450), color="#E0F7FA")
draw = ImageDraw.Draw(cover)
draw.rectangle([50, 50, 550, 400], fill="#B2EBF2", outline="#006064", width=3)
draw.text((120, 180), "COVER IMAGE", fill="#006064")
draw.text((100, 220), "Looks Normal", fill="#00838F")
cover.save("cover_test.png")
print("✅ cover_test.png ban gaya")

# Original Secret Image
original = Image.new("RGB", (600, 450), color="#FCE4EC")
draw = ImageDraw.Draw(original)
draw.rectangle([50, 50, 550, 400], fill="#F8BBD9", outline="#880E4F", width=3)
draw.text((100, 180), "SECRET IMAGE", fill="#880E4F")
draw.text((80, 220), "This will be hidden!", fill="#AD1457")
original.save("original_test.png")
print("✅ original_test.png ban gaya")

print("\nDono images ban gayi hain!")