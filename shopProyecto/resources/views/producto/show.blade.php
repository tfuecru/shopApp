@extends('app.base')

@section('contenido')
<div id="content-wrapper" class="d-flex flex-column">
    <div id="content">
        <div class="container-fluid">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Detalles producto</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div class="container-fluid">
                            <div class="table-responsive small">
                                <table class="table table-striped table-sm">
                                    <tbody>
                                        <tr>
                                            <td>Nombre</td>
                                            <td>{{ $producto->nombre }}</td>
                                        </tr>
                                        <tr>
                                            <td>Descripción</td>
                                            <td>{{ $producto->descripcion }}</td>
                                        </tr>
                                        <tr>
                                            <td>Color</td>
                                            <td>{{ $producto->color }}</td>
                                        </tr>
                                        <tr>
                                            <td>Precio</td>
                                            <td>{{ $producto->precio }} €</td>
                                        </tr>
                                        <tr>
                                            <td>Imagen</td>
                                            <td>
                                                @if($producto->cover !=null)
                                                <img class="img-backed" src="data:image/jpeg;base64, {{ $producto->cover }}">
                                                @endif
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a href="{{ url('producto') }}" class="btn btn-info"><i class="bi bi-box-arrow-in-left"></i></a>
                                <a class="btn-danger btn" href="{{ url('producto/' . $producto->id . '/edit') }}"><i class="bi bi-pencil-square"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection