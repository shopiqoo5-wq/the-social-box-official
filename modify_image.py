from PIL import Image

# Load the original image again from the user's uploaded media to be safe
# The newest media was media__1779799133369.png
img = Image.open('/Users/amit/.gemini/antigravity/brain/b47c75a2-e425-4d13-bd20-70bd10f11722/media__1779799133369.png').convert('RGBA')

width, height = img.size
# Let's crop it to (0, 0, height, height)
# If the blue icon is perfectly on the left, it's roughly square
# Let's check width/height to see if it's horizontal
print(f"Original size: {width}x{height}")

# Safe crop:
crop_area = (0, 0, height, height)
cropped_img = img.crop(crop_area)

cropped_img.save('public/images/client-logos/logo18_cropped.png')
print("Successfully cropped the image to just the icon.")
