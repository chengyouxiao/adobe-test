import os
old_string="A_realistic_3D_illustration_of_a_"
folder_path = "/Users/sunshower/Documents/#NewDocument After050824/02-15-25 Learning/Food_Compound_Words_Images copy 2"
for filename in os.listdir(folder_path):
    if filename.startswith(old_string):
        new_name = filename.replace(old_string,"")
        old_path = os.path.join(folder_path, filename)
        new_path = os.path.join(folder_path, new_name)
        os.rename(old_path, new_path)
        print(f"Renamed '{filename}' to '{new_name}'")