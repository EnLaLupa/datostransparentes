var countries = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    prefetch: '../../Home/Buscar2'
});



// passing in `null` for the `options` arguments will result in the default
// options being used



$(document).ready(function () {

    $('#prefetch .typeahead').typeahead(null, {
        name: 'countries',
        source: countries
    });

    //$('#input-Elegido').on('keyup', function () {
    //    var valor = $('#input-Elegido').val();
    //    if (valor.length < 10) {
    //        $('#Nombres').empty();
    //    }
    //    else {
    //        if (valor.length == 10) {
    //            $.ajax({
    //                cache: false,
    //                async: false,
    //                type: 'POST',
    //                data: {
    //                    origenData: valor
    //                },
    //                url: '../../Home/Buscar',
    //                dataType: 'json',
    //                success: function (data) {
    //                    $.each(data, function (index, item) {
    //                        $('#Nombres').append("<option value='" + item.busqueda + "'>" + item.Rut + "</option>");
    //                    });
    //                },
    //                //error: function (msg) {
    //                //    $('#btnagendar').attr('disabled', false);
    //                //}
    //            });
    //        }
    //    }
    //})

    $("#input-Elegido").keypress(function (e) {
        if (e.which == 13) {
            consultadetalle();
        }
    });

    $(".tt-menu").click(function (e) {
       consultadetalle();
        
    });

    $(".tt-menu").keypress(function (e) {
        if (e.which == 13) {
            consultadetalle();
        }
    });
});

function consultadetalle() {
    var valor = $('#input-Elegido').val();
    $('#detalle').empty();
    $.ajax({
        cache: false,
        async: false,
        type: 'POST',
        data: {
            origenData: valor
        },
        url: '../../../Home/Detalle',
        dataType: 'json',
        success: function (data) {
            var eLLL = data[0].PNombre;
            var aLLL = true;
            $.each(data, function (index, item) {
                if (eLLL == item.PNombre) {
                    if (aLLL) {
                        $("#detalle").append('<div class="col-12 margin"><b> Rut: </b>' + item.PRut + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Nombre: </b>' + item.PNombre + '</div>')
                        $("#detalle").append('<div class="col-4 borde">RUT</div><div class="col-4 borde">EMPRESA</div><div class="col-4 borde">CARGO</div>')
                        $('#detalle').append(agregar(item));
                        aLLL = false;
                    }
                    else {
                        $('#detalle').append(agregar(item));
                    }
                }
                else {
                    eLLL = item.PNombre;
                    aLLL = true;
                    $("#detalle").append('<div class="col-12 separacion text-center">- - - - - - - - - - -  - -</div>')
                    $("#detalle").append('<div class="col-12 margin"><b> Rut: </b>' + item.PRut + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Nombre: </b>' + item.PNombre + '</div>')
                    $("#detalle").append('<div class="col-4 borde">RUT</div><div class="col-4 borde">EMPRESA</div><div class="col-4 borde">CARGO</div>')
                    $('#detalle').append(agregar(item));
                    aLLL = false;

                }

            });


            //$("#detalle").append('<div class="col-12 margin"><b> Rut: </b>' + data[0].PRut + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Nombre: </b>' + data[0].PNombre + '</div>')
            //$("#detalle").append('<div class="col-4 borde">RUT</div><div class="col-4 borde">EMPRESA</div><div class="col-4 borde">CARGO</div>')
            //$.each(data, function (index, item) {
            //    if (auxiliar) {

            //    }
            //    $('#detalle').append(agregar(item));
            //});
        },
        //error: function (msg) {
        //    $('#btnagendar').attr('disabled', false);
        //}
    });
}

function buscar() {
    var valor = $('#input-Elegido').val();
    if (valor.length > 0) {
        consultadetalle();
    }
}


function agregar(item) {
    return '\
            <div class="col-4">' + item.FRut + '</div>\
            <div class="col-4">' + item.FEntidad + '</div>\
            <div class="col-4">' + item.PCargo + '</div>\
            '
}