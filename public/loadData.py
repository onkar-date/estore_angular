import mysql.connector
import json
import os

# Connect to MySQL database
cnx = mysql.connector.connect(
    user='root',
    password='root',
    host='127.0.0.1',
    database='estore_db'
)

cursor = cnx.cursor()

# Load JSON data from file
with open('products.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

for product in data['products']:
    product_name = product['name']
    product_description = product['description']
    price = product['price']
    stock_quantity = product['stock_quantity']
    seller_id = product['seller_id']

    # Construct the image file path
    image_path = f"{product_name}.webp"  # Change the extension if needed

    # Read the image file
    try:
        with open(image_path, 'rb') as img_file:
            image_data = img_file.read()
    except FileNotFoundError:
        print(f"Image file for '{product_name}' not found. Skipping this product.")
        continue

    # Prepare SQL query
    query = """
    INSERT INTO products (name, description, price, stock_quantity, seller_id, image)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (product_name, product_description, price, stock_quantity, seller_id, image_data)

    # Execute the query
    try:
        cursor.execute(query, values)
    except mysql.connector.Error as err:
        print(f"Error inserting {product_name}: {err}")
        continue

# Commit changes and close the connection
cnx.commit()
cursor.close()
cnx.close()
