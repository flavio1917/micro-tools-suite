import os
import re

files_to_check = [
    ('.vercel/output/static/strumenti/codici-errore-friggitrice-ad-aria/cosori/pro-le-5-0-quart-air-fryer/index.html', 'Cosori Pro LE 5.0 IT'),
    ('.vercel/output/static/strumenti/codici-errore-friggitrice-ad-aria/xiaomi/maf-d1001/index.html', 'Xiaomi D1001 IT'),
    ('.vercel/output/static/strumenti/codici-errore-friggitrice-ad-aria/philips/hd9280-90/index.html', 'Philips HD9280 IT')
]

for file_path, name in files_to_check:
    if os.path.exists(file_path):
        content = open(file_path, encoding='utf-8').read()
        match = re.search(r'<meta name="description" content="(.*?)">', content)
        if match:
            desc = match.group(1)
            print(f"{name}: {len(desc)} chars")
            print(f"Content: {desc}")
            print("-" * 50)
        else:
            print(f"Meta description not found in {name}")
    else:
        print(f"File not found: {file_path}")
