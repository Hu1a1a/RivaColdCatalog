#include "importExcel.jsx";

#include "importFigure.jsx";

font = ["Frutiger 45 Light", "Frutiger 55", "Frutiger 65", "Frutiger 75 Black", "Frutiger 95 Ultra Black"]

Path_Excel = 'D:\\RivaColdCatalog\\';
Path_Icon = 'D:\\RivaColdCatalog\\Iconos\\';
Path_Resource1 = 'D:\\RivaColdCatalog\\Resource 1-1\\';
Path_Resource2 = 'D:\\RivaColdCatalog\\Resource 1-2\\';
Path_tableCondicion = 'D:\\RivaColdCatalog\\Elemento\\tableCondicion\\';
Path_Elemento = 'D:\\RivaColdCatalog\\Elemento\\';
//$.writeln()
DB = GetDataFromExcelPC(Path_Excel + "CatalogoDB.xlsx", 1)

doc = app.activeDocument
docpages = doc.pages
doc.documentPreferences.pagesPerDocument = 1;
DBPage = [], DBPagType = [], DBSeccion = [], nSeccion = 0
for (i = 0, pagina = 1, DBlength = DB.length; i < DBlength; i++) {
    Seccion = true
    for (j = 0, SeccionL = DBSeccion.length; j < SeccionL; j++) {
        DBSeccion[j] == DB[i]["Seccion"] ? Seccion = false : null
    }
    if (Seccion) {
        DBSeccion[nSeccion] = DB[i]["Seccion"]
        nSeccion++
        if (DB[i]["Maestro1pag"]) {
            for (j = 0, pag = DB[i]["Maestro1pag"]; j < pag; j++, pagina++) {
                docpages.add()
                docpages[pagina].appliedMaster = doc.masterSpreads.itemByName("1-Principal")
                DBPage.push(DB[i])
                DBPagType[pagina] = j < 2 ? "Principal" : "Principal2"
            }
        }
        if (DB[i]["Maestro2pag"]) {
            for (j = 0, pag = DB[i]["Maestro1pag"]; j < pag; j++, pagina++) {
                docpages.add()
                docpages[pagina].appliedMaster = doc.masterSpreads.itemByName("2-Secundario")
                DBPage.push(DB[i])
                DBPagType[pagina] = j < 2 ? "Datos" : "Datos2"
            }
        }
    }
}

for (i = 1; i < pagina; i += 2) {
    TextFramesGama(0, 8.5, DBPage[i]["Gama1"])
    TextFramesGama(361, 8.35, DBPage[i]["Gama1"])
    TextFramesLabel(366, 114.4, DBPage[i]["Gama1"] + " - " + DBPage[i]["Label"])
    if (DBPagType[i] == "Principal") {
        TextFramesTitle(25, 23.381, DBPage[i]["Titulo"], false)
        TextFramesTitle(214, 23.381, DBPage[i]["Condicion"], true)
        Dist_Icon = DBPage[i]["Icono12"] ? 12 : 14
        for (j = 1; j <= 15; j++) {
            ImageFramesIcon(Path_Icon, 7, 30 + (j - 1) * Dist_Icon, DBPage[i]["Icono" + j])
        }
        ImageFramesResource(Path_Resource2, 22, 28, DBPage[i]["Resource1-2"], false)
        ImageFramesResource(Path_Resource1, 22, 28, DBPage[i]["Resource1-1"], true)
        //Function Table potencia
        PositionY1 = 29, PositionX1 = 212
        PositionY1 = TablePower(PositionX1, PositionY1, "TN", DBPage, DB, i)
        PositionY1 = TablePower(PositionX1, PositionY1, "BT", DBPage, DB, i)
        PositionY1 = TablePower(PositionX1, PositionY1, "AT", DBPage, DB, i)
        PositionY1 = TablePower(PositionX1, PositionY1, "TN / BT", DBPage, DB, i)
        PositionY1 = TextFramesTableLabel(PositionX1, PositionY1, DBPage, DB, i, DBPagType[i])
        for (j = 0; j < 10; j++) {
            PositionX1,
            PositionY1 = TextFramesElement(Path_Elemento, PositionX1, PositionY1, i, DBPage[i]["ElementoPag2_" + j])
        }
        if (DBPage[i]["D_1_1"]) {
            ImageFramesResource(Path_tableCondicion, 212, 195.79, DBPage[i]["tableCondicion"], true)
        }
    } else if (DBPagType[i] == "Principal2") {
        TextFramesLabel(7.5, 114.4, DBPage[i]["Gama1"] + " - " + DBPage[i]["Label"])
    } else if (DBPagType[i] == "Datos") {
        TextFramesLabel(7.5, 114.4, DBPage[i]["Gama1"] + " - " + DBPage[i]["Label"])
        PositionY1 = 29, PositionX1 = 22
        for (j = 0; j < 10; j++) {
            PositionX1,
            PositionY1 = TextFramesElement(Path_Elemento, PositionX1, PositionY1, i, DBPage[i]["ElementoPag3_" + j])
        }
        PositionY1 = 29, PositionX1 = 212
        PositionY1 = TableDades(PositionX1, PositionY1, DBPage, DB, i)
        PositionY1 = TextFramesTableLabel(PositionX1, PositionY1, DBPage, DB, i, DBPagType[i])
        for (j = 0; j < 10; j++) {
            PositionX1,
            PositionY1 = TextFramesElement(Path_Elemento, PositionX1,    PositionY1, i, DBPage[i]["ElementoPag4_" + j])
        }
    } else if (DBPagType[i] == "Datos2") {
        TextFramesLabel(7.5, 114.4, DBPage[i]["Gama1"] + " - " + DBPage[i]["Label"])
    }
    ImageFramesRefrigerant(Path_Icon, 362.2, 22.9, DBPage[i]["Icono"])
    ImageFramesRefrigerant(Path_Icon, 3.4, 22.9, DBPage[i]["Icono"])
    $.writeln(i + "/" + (pagina - 2))
}