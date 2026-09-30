import os
import re

base_dir = 'src/components/seo-tools/'
files = ['materiali.astro', 'pulizia.astro', 'surgelati.astro', 'riscaldare.astro', 'calorie.astro', 'consumi.astro']

for file in files:
    filepath = os.path.join(base_dir, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove homeUrl and backBtnLabel from frontmatter
    content = re.sub(r"const homeUrl = .*?;\n", "", content)
    content = re.sub(r"const backBtnLabel = \{\s*it:.*?\}\[lang\].*?;\n", "", content, flags=re.DOTALL)

    # Extract breadcrumb values from the existing breadcrumbSchema JSON-LD logic
    # We'll parse the second and third position names
    hub_name_match = re.search(r'"name": ({"it": "Strumenti"[^\n]+?}\[lang\] \|\| "Strumenti"),', content)
    hub_path_match = re.search(r'"item": `https://www.crispissimo.com\${({"it": "/strumenti/"[^\n]+?}\[lang\] \|\| "/strumenti/")}`', content)
    tool_name_match = re.search(r'"position": 3,\s*"name": ({"it": "[^\n]+?}\[lang\] \|\| ""),', content)

    if hub_name_match and hub_path_match and tool_name_match:
        hub_name_expr = hub_name_match.group(1)
        hub_path_expr = hub_path_match.group(1)
        tool_name_expr = tool_name_match.group(1)
        
        # Build the Breadcrumb UI
        breadcrumb_ui = f"""
    <nav aria-label="Breadcrumb" class="mb-8 flex justify-start w-full overflow-x-auto pb-2">
      <ol class="flex items-center space-x-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
        <li><a href={{lang === 'it' ? '/' : `/${{lang}}/`}} class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</a></li>
        <li><span class="mx-1.5 md:mx-2 text-slate-300 dark:text-slate-600">/</span></li>
        <li><a href={{{hub_path_expr}}} class="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">{{{hub_name_expr}}}</a></li>
        <li><span class="mx-1.5 md:mx-2 text-slate-300 dark:text-slate-600">/</span></li>
        <li aria-current="page" class="text-slate-800 dark:text-slate-200 font-medium truncate">{{{tool_name_expr}}}</li>
      </ol>
    </nav>"""

        # 2. Replace the top back button block with Breadcrumb UI
        content = re.sub(r'<div class="mb-8 flex justify-start">\s*<a href=\{homeUrl\}[^>]+>.*?</a>\s*</div>', lambda m: breadcrumb_ui.strip(), content, flags=re.DOTALL)

        # 3. Remove the bottom back button block
        content = re.sub(r'<div class="mt-12 text-center pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors">\s*<a href=\{homeUrl\}[^>]+>.*?</a>\s*</div>', "", content, flags=re.DOTALL)

        # In some files it might lack "transition-colors" or be slightly different
        content = re.sub(r'<div class="mt-12 text-center pt-8 border-t border-slate-200 dark:border-slate-800[^"]*">\s*<a href=\{homeUrl\}[^>]+>.*?</a>\s*</div>', "", content, flags=re.DOTALL)
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
    else:
        print(f"Failed to find schema in {file}")
