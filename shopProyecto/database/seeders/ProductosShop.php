<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductosShop extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        for( $i = 0; $i < 60; $i++ ) {
            $nombre = 'Producto ' . $i;
            $descripcion = 'Descripción rápida del producto ' . $i;
            $color = ['rojo', 'negro', 'azul', 'blanco', 'amarillo'][rand(0, 4)];
            $precio = rand(1, 500);
            
            $imagenUrl = 'https://picsum.photos/800?random=' . rand();
            $imagenData = file_get_contents($imagenUrl);
            $imagenBase64 = base64_encode($imagenData);
            
            DB::table('producto')->insert([
                'nombre' => $nombre,
                'descripcion' => $descripcion,
                'color' => $color,
                'precio' => $precio,
                'cover' => $imagenBase64,
            ]);
        }
    }
}
