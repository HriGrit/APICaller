from PIL import Image, ImageDraw

# Open the PNG image
image = Image.open('../../public/melltoo-img1.png')

image = image.convert('RGB')

width, height = image.size

division_height = height // 2

# Crop the top and bottom parts of the image
top_part = image.crop((0, 0, width, division_height))
bottom_part = image.crop((0, division_height, width, height))

width_top, height_top = top_part.size
width_bottom, height_bottom = bottom_part.size
print(width_top, height_top)
print(width_bottom, height_bottom)

color_count_top = {}
for i in range(width):
    for j in range(division_height):
        pixel_color = top_part.getpixel((i, j))
        if pixel_color in color_count_top:
            color_count_top[pixel_color] += 1
        else:
            color_count_top[pixel_color] = 1

color_count_bottom = {}
for i in range(width):
    for j in range(division_height, height):
        print(i,j)
        pixel_color = bottom_part.getpixel((i, j))
        if pixel_color in color_count_bottom:
            color_count_bottom[pixel_color] += 1
        else:
            color_count_bottom[pixel_color] = 1


most_common_colors_top = sorted(color_count_top, key=color_count.get)
most_common_color_top = most_common_colors_top[-1]


def check(color):
    m = 0
    for i in color:
        if (i > 200 or i < 50):
            m += 1
    if (m > 2):
        return True
    else:
        return False

while (check(most_common_color_top)):
    print(most_common_color_top)
    most_common_colors_top.pop()
    most_common_color_top = most_common_colors_top[-1]

print(most_common_color_top)

result_image = Image.new('RGB', (width, division_height), most_common_color_top)

result_image.save('gradient_background.png')

# Display the image (optional)
result_image.show()