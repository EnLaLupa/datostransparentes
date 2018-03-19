using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using WebBuscadorDirectores.Models;

namespace WebBuscadorDirectores.Controllers
{
    public class HomeController : Controller
    {
        private CmfChileEntities _context = new CmfChileEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }


        public JsonResult Buscar(string origenData)
        {
            var lista= _context.ListadoBusqueda.Where(r => r.busqueda.Contains(origenData)).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Buscar2()
        {
            var lista = _context.ListadoBusqueda.Select(r=>r.busqueda).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Detalle(string origenData)
        {
            string texto = origenData.Split('-')[0].Trim();
            Regex reg = new Regex("[0-9]");
            List<ListadoDirectores> lista = new List<ListadoDirectores>();
            if (reg.IsMatch(texto))
            {
                lista = _context.ListadoDirectores.Where(r => r.Rut.StartsWith(texto) || r.ListadoFiscalizados.Rut.StartsWith(texto)).OrderBy(r => r.Nombre).ToList();
            }
            else
            {
                lista = _context.ListadoDirectores.Where(r => r.Nombre.Contains(texto) || r.ListadoFiscalizados.Entidad.Contains(texto)).OrderBy(r => r.Nombre).ToList();
            }

            var aux = lista.Select(r => new
            {
                PNombre = r.Nombre,
                PRut = r.Rut,
                PCargo = r.Cargo,
                FEntidad = r.ListadoFiscalizados.Entidad,
                FRut = r.ListadoFiscalizados.Rut
            });
            return Json(aux, JsonRequestBehavior.AllowGet);
        }

        

    }
}