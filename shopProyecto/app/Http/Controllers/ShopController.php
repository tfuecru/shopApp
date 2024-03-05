<?php

namespace App\Http\Controllers;

use App\Data\Chart;
use Illuminate\Http\Request;
use App\Models\Producto;

class ShopController extends Controller {
    
    function add(Request $request, $id) {
        $producto = Producto::find($id);
        $chart = $request->session()->get('chart', null);
        if($chart == null) {
            $chart = new Chart();
        }
        if($producto != null) {
            $chart->add($producto);    
        }
        $request->session()->put('chart', $chart);
        return response()->json($chart->get());
    }
    
    function chart() {
        $carrito = new Chart();
        $producto = new Producto();
        $producto->code = 'MNZ';
        $producto->name = 'Manzana';
        $producto2 = new Producto();
        $producto2->code = 'TMT';
        $producto2->name = 'Tomate';
        $carrito->add($producto);
        $carrito->add($producto);
        $carrito->add($producto);
        $carrito->add($producto);
        $carrito->add($producto2);
        $carrito->add($producto2);
        $carrito->substract($producto2);
        $carrito->get();
        $carrito->empty($producto);
        dd($carrito);
        
    }
    
    function producto(Request $request) {
        $productos = Producto::orderBy('nombre', 'asc')->paginate(9);
        $chart = $request->session()->get('chart', null);
        if($chart == null) {
            $chart = new Chart();
        }
        return response()->json(['productos' => $productos, 'chart' => $chart]);
    }
    
    function shop() {
        //dd([]);
        return view('shop.shop');
    }
    
}
