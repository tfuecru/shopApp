@extends('app.base')

@section('contenido')
<div id="content-wrapper" class="d-flex flex-column">

    <!-- Main Content -->
    <div id="content">
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

            
            <!-- DataTales Example -->
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Detalles productos</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">
                            <div class="row">
                                <div class="boton">
                                     <a class="btn-info btn" href="{{ url('producto/create') }}">link to create</a>
                                </div>
                               
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <table class="table table-bordered dataTable" id="dataTable" width="100%"
                                        cellspacing="0" role="grid" aria-describedby="dataTable_info"
                                        style="width: 100%;">
                                        <thead>
                                            <tr role="row">
                                                <th class="sorting sorting_asc" tabindex="0" aria-controls="dataTable"
                                                    rowspan="1" colspan="1" style="width: 57px;" aria-sort="ascending"
                                                    aria-label="nombre: activate to sort column descending">Nombre</th>
                                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1"
                                                    colspan="1" style="width: 61px;"
                                                    aria-label="Descripción: activate to sort column ascending">Descripción
                                                </th>
                                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1"
                                                    colspan="1" style="width: 49px;"
                                                    aria-label="Color: activate to sort column ascending">Color</th>
                                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1"
                                                    colspan="1" style="width: 31px;"
                                                    aria-label="Precio: activate to sort column ascending">Precio</th>
                                                <th class="sorting" tabindex="0" aria-controls="dataTable" rowspan="1"
                                                    colspan="1" style="width: 68px;"
                                                    aria-label="Imagen: activate to sort column ascending">Imagen</th>
                                                <th style="width: 68px;">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                    @foreach($productos as $producto)
                                                        <tr>
                                                            <td>{{ $producto->nombre }}</td>
                                                            <td>{{ $producto->descripcion }}</td>
                                                            <td>{{ $producto->color }}</td>
                                                            <td>{{ $producto->precio }} €</td>
                                                            <td>
                                                                @if($producto->cover !=null)
                                                                  <img class="img-backed" src="data:image/jpeg;base64, {{ $producto->cover }}">
                                                                @endif
                                                            </td>
                                                             <td>
                                                                <a class="btn-primary btn" href="{{ url('producto/' . $producto->id) }}"><i class="bi bi-eye"></i></a>
                                                                <a class="btn-danger btn" href="{{ url('producto/' . $producto->id . '/edit') }}"><i class="bi bi-pencil-square"></i></a>
                                                                <form data-name="{{ $producto->nombre }}" class="formDelete" action="{{ url('producto/' . $producto->id) }}" method="post" style="display: inline-block">
                                                                  @csrf
                                                                  @method('delete')
                                                                  <button type="submit" class="btn btn-warning"><i class="bi bi-trash3"></i></button>
                                                                </form>
                                                            </td>
                                                        </tr>
                                                    @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="row">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>

<script>
  const forms = document.querySelectorAll(".formDelete");
  forms.forEach(function(form) {
      form.onsubmit = (event) => {
        return confirm('Seguro que quieres borrar ' + event.target.dataset.name + '?');
      };
  });
</script>
@endsection