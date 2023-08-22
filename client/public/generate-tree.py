import os
import json

def generate_json_tree(root_dir):
    json_data = {}
    
    for root, dirs, files in os.walk(root_dir):
        for filename in files:
            file_path = os.path.join(root, filename)
            relative_path = os.path.relpath(file_path, root_dir)
            
            parts = relative_path.split(os.path.sep)
            if len(parts) >= 3:
                marca = parts[1]
                tipo = "Logo"
                valor = "\\".join(["\\marks"] + parts[1:])
                
                opcion_key = f"opcion{len(json_data) + 1}"
                json_data[opcion_key] = {
                    "nombre": marca,
                    "valor": valor,
                    "tipo": tipo,
                }
    
    return json_data

# Ruta al directorio raíz que deseas procesar
root_directory = "/Users/Julio/Developments/React/engrave-react-app/client/public"  # Cambia esta línea

# Generar el JSON
json_tree = generate_json_tree(root_directory)

# Escribir el JSON en un archivo
output_file_path = "output.json"
with open(output_file_path, "w") as json_file:
    json.dump(json_tree, json_file, indent=4)

print(f"JSON generado y guardado en {output_file_path}")
