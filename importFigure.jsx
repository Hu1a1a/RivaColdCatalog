#include "Math.jsx";

function TextFramesGama(x, y, content) {
    frame = docpages[i].textFrames.add({
        contents: content,
        geometricBounds: [y, x, y + 19, x + 19],
        strokeWidth: 0,
        parentStory: {
            appliedFont: font[3],
            pointSize: 19
        },
    })
    frame.texts[0].fillColor = doc.swatches.itemByName("Paper")
    frame.texts[0].justification = Justification.CENTER_ALIGN
    frame.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN
}

function TextFramesTitle(x, y, content, align) {
    frame = docpages[i].textFrames.add({
        contents: content,
        geometricBounds: [y, x, y + 4, x + 142],
        strokeWidth: 0,
        parentStory: {
            appliedFont: font[2],
            pointSize: 8
        },
    })
    if (align) {
        frame.texts[0].justification = Justification.RIGHT_ALIGN
    }
    frame.texts[0].fillColor = doc.swatches.itemByName("Black")
    frame.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN
    frame.texts[0].tracking = 40
}

function TextFramesLabel(x, y, content) {
    frame = docpages[i].textFrames.add({
        contents: content,
        geometricBounds: [y, x, y + 6.4, x + 80],
        strokeWidth: 0,
        parentStory: {
            appliedFont: font[3],
            pointSize: 11
        },
    })
    frame.texts[0].justification = Justification.RIGHT_ALIGN
    frame.texts[0].fillColor = doc.swatches.itemByName("c0m0y0k68")
    frame.texts[0].tracking = 30
    frame.absoluteRotationAngle = 90
}

function ImageFramesRefrigerant(Path, x, y, content) {
    if (content) {
        oval = docpages[i].ovals.add({
            contents: content,
            geometricBounds: [y, x, y + 9.356, x + 9.356],
            strokeWidth: 0.5,
            justification: Justification.CENTER_ALIGN,
            tracking: 20,
            parentStory: {
                appliedFont: font[2],
                pointSize: 7.5
            },
        })

        frame = docpages[i].textFrames.add({
            contents: content,
            geometricBounds: [y, x, y + 9.356, x + 9.356],
            strokeWidth: 0,
            parentStory: {
                appliedFont: font[2],
                pointSize: 7.5
            },
        })
        frame.texts[0].justification = Justification.CENTER_ALIGN
        frame.textFramePreferences.verticalJustification = VerticalJustification.CENTER_ALIGN
        frame.texts[0].tracking = 20
        if (content == "R290") {
            oval.fillColor = doc.swatches.itemByName("C=55 M=10 Y=100 K=0")
            oval.strokeColor = doc.swatches.itemByName("Paper")
            frame.texts[0].fillColor = doc.swatches.itemByName("Paper")

        } else if (content == "CO2") {
            oval.fillColor = doc.swatches.itemByName("Paper")
            oval.strokeColor = doc.swatches.itemByName("C=100 M=0 Y=0 K=0")
            frame.texts[0].fillColor = doc.swatches.itemByName("C=100 M=0 Y=0 K=0")

        } else if (content == "A2L") {
            frame.place(File(Path + content + ".jpg"))
        } else {
            oval.fillColor = doc.swatches.itemByName("C=100 M=90 Y=10 K=0")
            oval.strokeColor = doc.swatches.itemByName("Paper")
            frame.texts[0].fillColor = doc.swatches.itemByName("Paper")
        }
    }
}

function ImageFramesIcon(Path, x, y, content) {
    if (content) {
        frame = docpages[i].textFrames.add({
            contents: content,
            geometricBounds: [y, x, y + 12, x + 12],
            strokeWidth: 0,
            justification: Justification.RIGHT_ALIGN,

        })
        frame.place(File(Path + content + ".jpg"))
        frame.fit(FitOptions.FRAME_TO_CONTENT)
        frame.move([2 * frame.geometricBounds[1] - x, y])
    }
}

function ImageFramesResource(Path, x, y, content, align) {
    if (content) {
        frame = docpages[i].textFrames.add({
            contents: content,
            geometricBounds: [y, x, y + 182, x + 146],
            strokeWidth: 0,
            justification: Justification.RIGHT_ALIGN,
        })
        frame.place(File(Path + content + ".jpg"))
        frame.fit(FitOptions.FRAME_TO_CONTENT)
        align ? frame.move([x, y]) : frame.move([2 * frame.geometricBounds[1] - x, y])
    }
}

//1:Name;2:Decimal;3:Long
ArrayTable1 = [
    ["Armario", null, 12],
    ["SERP", 2, 7],
    ["COP", 2, 7],
    ["€uros", 2, 12],
    ["Voltaje", null, 11],
    ["Compresor", null, 12],
    ["Refrig.", null, 8],
    ["INVERTER_Mín/Máx_rpm", null, 12],
    ["HP", 2, 9],
    ["Refrig_Kg", null, 12],
    ["Gas Cooler Remoto", null, 25],
    ["Gas Cooler Remoto_standard noise", null, 25],
    ["Gas Cooler Remoto_low noise", null, 25],
]

function TablePower(x, y, AP, DBPage, DB, i) {
    table = docpages[i].textFrames.add({
        contents: "MODELO",
        geometricBounds: [y, x, y + 183.3, x + 148.75]
    })
    table = table.texts[0].convertToTable()
    RegDB_row = [], RegDB_column = ["Ref"]
    for (j = 0, DBlength = DB.length; j < DBlength; j++) {
        if (DBPage[i]["Seccion"] == DB[j]["Seccion"] && DB[j]["AP"] == AP) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().cells.lastItem().contents = DB[j]["Ref"]
            RegDB_row.push(j)
        }
    }
    table.columns.lastItem().width = 24
    if (table.rows.length == 1) {
        table.parent.fit(FitOptions.FRAME_TO_CONTENT)
        table.remove()
    } else {
        table.cells.everyItem().appliedCellStyle = doc.cellStyles.itemByName("TablaPotencia")
        table.cells.everyItem().texts[0].appliedFont = font[0]
        colRefrigerante = 0
        for (j = 0, arrayLength = ArrayTable1.length; j < arrayLength; j++) {
            if (DBPage[i][ArrayTable1[j][0]]) {
                table.columns.add(LocationOptions.AT_END)
                RegDB_column.push(ArrayTable1[j][0])
                table.columns.lastItem().cells[0].contents = ArrayTable1[j][0]
                for (k = 1, rowlength = table.rows.length; k < rowlength; k++) {
                    table.rows[k].cells.lastItem().contents = ArrayTable1[j][1] ? Intl(DB[RegDB_row[k - 1]][ArrayTable1[j][0]], 2) : DB[RegDB_row[k - 1]][ArrayTable1[j][0]]
                    ArrayTable1[j][0] == "HP" && DB[RegDB_row[k - 1]]["Compresor_Nº"] > 1 ? table.rows[k].cells.lastItem().contents = DB[RegDB_row[k - 1]]["Compresor_Nº"] + " x " + Intl(DB[RegDB_row[k - 1]][ArrayTable1[j][0]], 2) : null
                    ArrayTable1[j][0] == "Refrig_Kg" && DB[RegDB_row[k - 1]]["Compresor_Nº"] > 1 ? table.rows[k].cells.lastItem().contents = DB[RegDB_row[k - 1]]["Compresor_Nº"] + " x " + DB[RegDB_row[k - 1]][ArrayTable1[j][0]] : null

                }
                ArrayTable1[j][0] == "Refrig_Kg" ? table.columns.lastItem().cells[0].contents = DB[RegDB_row[0]]["Refrigerante"] + "\n" + "Kg" : null
                table.columns.lastItem().width = ArrayTable1[j][2]
                DBPage[i]["FormatoTempEvap"] == "Temp. de EVAPORACIÓN" && ArrayTable1[j][0] == "HP" ? table.columns.lastItem().width = ArrayTable1[j][2] * 2 : null
                DBPage[i]["FormatoTempEvap"] == "Temp. de EVAPORACIÓN" && ArrayTable1[j][0] == "Compresor" ? table.columns.lastItem().width = ArrayTable1[j][2] * 2 : null

            }
        }
        nTamb = DB[RegDB_row[0]]["Tamb"]
        nTcam = DB[RegDB_row[0]]["Tcam"]
        ExtCol = (nTamb > 0 ? 1 : 0) + (DB[RegDB_row[0]]["PM_1_1"] && nTcam > 1 && !DB[RegDB_row[0]]["DM_1_1"] ? 1 : 0) + (DB[RegDB_row[0]]["DM_1_1"] ? 2 : 0)
        nCol = nTcam * (DB[RegDB_row[0]]["D_1_1"] ? 2 : 1) * (DB[RegDB_row[0]]["DM_1_1"] ? 0.5 : 1)
        nRow = nTamb * (DB[RegDB_row[0]]["PM_1_1"] && nTcam > 1 && !DB[RegDB_row[0]]["DM_1_1"] ? 2 : 1) * (DB[RegDB_row[0]]["DM_1_1"] ? 4 : 1)

        if (nTamb > 0 && nTcam > 0) {
            table.rows.add(LocationOptions.AFTER, table.rows[0])
            for (j = 0; j < RegDB_row.length; j++) {
                for (k = 0; k < nRow - 1; k++) {
                    table.rows.add(LocationOptions.AFTER, table.rows[j * nRow + 2])
                }
            }


            for (j = 0; j < ExtCol; j++) {
                if (j == 0) {
                    table.columns.add(LocationOptions.AT_END)
                    table.columns.lastItem().width = 8
                    table.rows[0].cells.lastItem().contents = DB[RegDB_row[0]]["FormatoAmb"]
                    for (k = 0; k < RegDB_row.length; k++) {
                        for (m = 1; m - 1 < nTamb; m++) {
                            table.rows[k * nRow + (m - 1) * nRow / nTamb + 2].cells.lastItem().contents = DB[RegDB_row[k]]["Tamb" + m]
                        }
                    }
                } else if (j == 1 && ExtCol > 2) {
                    table.columns.add(LocationOptions.AT_END)
                    table.columns.lastItem().width = 8
                    table.rows[0].cells.lastItem().contents = "Reg."
                    for (k = 2; k < table.rows.length; k = k + 4) {
                        table.columns.lastItem().cells[k].contents = "max"
                        table.columns.lastItem().cells[k + 2].contents = "min"
                    }
                } else if (j == 1) {
                    table.columns.add(LocationOptions.AT_END)
                    table.columns.lastItem().width = 8
                    table.rows[0].cells.lastItem().contents = "Reg."
                    for (k = 2; k < table.rows.length; k = k + 2) {
                        table.columns.lastItem().cells[k].contents = "max"
                        table.columns.lastItem().cells[k + 1].contents = "min"
                    }
                } else if (j == 2) {
                    table.columns.add(LocationOptions.AT_END)
                    table.columns.lastItem().width = 8
                    table.rows[0].cells.lastItem().contents = "Unit."
                    for (k = 2; k < table.rows.length; k = k + 2) {
                        table.columns.lastItem().cells[k].contents = "W"
                        table.columns.lastItem().cells[k + 1].contents = "m3"
                    }
                }
            }
            for (j = 0; j < nTcam; j++) {
                table.columns.add(LocationOptions.AT_END)
                table.rows[0].cells.lastItem().contents = DB[RegDB_row[0]]["Tcam" + (j + 1)]
                if (DB[RegDB_row[0]]["D_1_1"] && !DB[RegDB_row[0]]["DM_1_1"]) {
                    table.rows[1].cells.lastItem().contents = "Watios"
                    table.columns.add(LocationOptions.AT_END)
                    table.rows[1].cells.lastItem().contents = "m3"
                } else if (DB[RegDB_row[0]]["PM_1_1"] && nTcam <= 1 && !DB[RegDB_row[0]]["DM_1_1"]) {
                    table.rows[1].cells.lastItem().contents = "max"
                    table.columns.add(LocationOptions.AT_END)
                    table.rows[1].cells.lastItem().contents = "min"
                }
            }
            for (j = 2, l = 1, rowslength = table.rows.length, columnslength = table.columns.length - 1, m = 0; j < rowslength; j++) {
                if (DB[RegDB_row[m]]["DM_1_1"]) {
                    j = j + 3
                    for (k = 1; k <= nTcam; k++) {
                        table.rows[j - 3].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["P_" + l + "_" + k], 0)
                        table.rows[j - 2].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["D_" + l + "_" + k], 1)
                        table.rows[j - 1].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["PM_" + l + "_" + k], 0)
                        table.rows[j].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["DM_" + l + "_" + k], 1)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j - 3].cells[columnslength - nTcam + k].texts[0].appliedFont = font[2] : null
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j - 2].cells[columnslength - nTcam + k].texts[0].appliedFont = font[2] : null
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j - 1].cells[columnslength - nTcam + k].texts[0].appliedFont = font[2] : null
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nTcam + k].texts[0].appliedFont = font[2] : null
                    }
                } else if (DB[RegDB_row[0]]["PM_1_1"] && nTcam > 1) {
                    j = j + 1
                    for (k = 1; k <= nTcam; k++) {
                        table.rows[j - 1].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["P_" + l + "_" + k], 0)
                        table.rows[j].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["PM_" + l + "_" + k], 0)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j - 1].cells[columnslength - nTcam + k].texts[0].appliedFont = font[2] : null
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nTcam + k].texts[0].appliedFont = font[2] : null

                    }
                } else if (DB[RegDB_row[0]]["PM_1_1"]) {
                    for (k = 1; k <= nTcam; k++) {
                        table.rows[j].cells[columnslength - nCol + nCol / nTcam * k - 1].contents = Intl(DB[RegDB_row[m]]["P_" + l + "_" + k], 0)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nCol + nCol / nTcam * k - 1].texts[0].appliedFont = font[2] : null
                        table.rows[j].cells[columnslength - nCol + nCol / nTcam * k].contents = Intl(DB[RegDB_row[m]]["PM_" + l + "_" + k], 0)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nCol + nCol / nTcam * k].texts[0].appliedFont = font[2] : null

                    }
                } else if (DB[RegDB_row[0]]["D_1_1"]) {
                    for (k = 1; k <= nTcam; k++) {
                        table.rows[j].cells[columnslength - nCol + nCol / nTcam * k - 1].contents = Intl(DB[RegDB_row[m]]["P_" + l + "_" + k], 0)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nCol + nCol / nTcam * k - 1].texts[0].appliedFont = font[2] : null
                        table.rows[j].cells[columnslength - nCol + nCol / nTcam * k].contents = Intl(DB[RegDB_row[m]]["D_" + l + "_" + k], 1)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nCol + nCol / nTcam * k].texts[0].appliedFont = font[2] : null
                    }
                } else {
                    for (k = 1; k <= nTcam; k++) {
                        table.rows[j].cells[columnslength - nTcam + k].contents = Intl(DB[RegDB_row[m]]["P_" + l + "_" + k], 0)
                        DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg1"] || DB[RegDB_row[m]]["Tamb" + k] == DB[RegDB_row[m]]["TcamNeg2"] ? table.rows[j].cells[columnslength - nCol + nCol / nTcam * k].texts[0].appliedFont = font[2] : null
                    }
                }
                if (l < DB[RegDB_row[m]]["Tamb"]) {
                    l++
                } else {
                    l = 1
                    m++
                }
            }
        }
        //COLOR CABECERA
        table.rows[0].fillColor = doc.swatches.itemByName("PANTONE 425 C 24 17%")
        table.rows[1].fillColor = doc.swatches.itemByName("PANTONE 425 C 24 17%")
        //MERGE    
        nM3 = DB[RegDB_row[0]]["DM_1_1"] ? 1 : DB[RegDB_row[0]]["D_1_1"] ? 2 : 1
        nRowAmb = DB[RegDB_row[0]]["DM_1_1"] ? 4 * nTamb : DB[RegDB_row[0]]["PM_1_1"] ? 2 * nTamb : nTamb
        maxmin = DB[RegDB_row[0]]["DM_1_1"] ? 2 : DB[RegDB_row[0]]["PM_1_1"] ? 1 : 0

        for (k = table.rows[0].cells.length - nCol - ExtCol; k < table.columns.length; k++) {
            for (j = 2; j < table.columns[k].cells.length; j++) {
                if (j % 2 == 1) {
                    table.columns[k].cells[j].fillColor = doc.swatches.itemByName("PANTONE 425 C 24 17%")
                }
            }
        }
        for (j = 0; j < table.columns.length; j++) {
            for (k = 0; k < table.columns[j].cells.length - 1;) {
                if (table.columns[j].cells[k + 1].texts[0].length > 0) {
                    k++
                } else {
                    table.columns[j].cells[k].merge(table.columns[j].cells[k + 1])
                }

            }
        }
        for (j = 0; j < table.rows[0].cells.length - 1; j++) {
            if (table.rows[0].cells[j + 1].texts[0].length <= 0) {
                table.rows[0].cells[j].merge(table.rows[0].cells[j + 1])
            }
        }



        //CONFIGURACIÓN GENERAL
        table.cells.everyItem().texts[0].justification = Justification.CENTER_ALIGN
        //COLUMNA DE APLICACION
        table.columns.add(LocationOptions.AT_BEGINNING)
        for (j = 1, rowlength = table.columns[0].cells.length - 1; j < rowlength; j++) {
            table.columns[0].cells[1].merge(table.columns[0].cells[2])
        }
        table.columns[0].cells[1].contents = AP
        table.columns[0].cells[1].texts[0].pointSize = "6 pt"
        table.columns[0].cells[1].rotationAngle = 270
        table.columns[0].cells[1].texts[0].justification = Justification.CENTER_ALIGN
        if (AP === "AT") {
            table.columns[0].cells[1].fillColor = doc.swatches.itemByName("r229g175b18")
        } else if (AP === "BT") {
            table.columns[0].cells[1].fillColor = doc.swatches.itemByName("r120g149b206")
        } else if (AP === "TN") {
            table.columns[0].cells[1].fillColor = doc.swatches.itemByName("r200g218b3")
        } else {
            table.columns[0].cells[1].fillColor = doc.swatches.itemByName("r120g149b206")
        }
        table.cells.everyItem().height = nTamb > 1 ? 3 : 5.5


        table.cells.everyItem().topEdgeStrokeWeight = 0
        if (nTamb > 1) {
            table.cells.everyItem().bottomEdgeStrokeWeight = 0.25
        } else {
            table.cells.everyItem().bottomEdgeStrokeWeight = 0
        }
        table.cells.everyItem().leftEdgeStrokeWeight = 0
        table.cells.everyItem().rightEdgeStrokeWeight = 0
        table.columns[table.columns.length - nM3 * nTcam - 1].cells.everyItem().bottomEdgeStrokeWeight = 0
        for (j = 0; j < nM3 * nTcam; j++) {
            table.columns[table.columns.length - j - 1].width = 8
            table.columns[table.columns.length - j - 1].cells.everyItem().bottomEdgeStrokeWeight = 0
        }
        for (j = 0; j < 2; j++) {
            table.rows[j].cells.everyItem().topEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().topEdgeStrokeColor = doc.swatches.itemByName("Paper")
            table.rows[j].cells.everyItem().bottomEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().bottomEdgeStrokeColor = doc.swatches.itemByName("Paper")
            table.rows[j].cells.everyItem().leftEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().leftEdgeStrokeColor = doc.swatches.itemByName("Paper")
            table.rows[j].cells.everyItem().rightEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().rightEdgeStrokeColor = doc.swatches.itemByName("Paper")
        }
        table.columns[0].width = 3
        table.cells.everyItem().texts[0].leading = "8.4 pt"
        table.cells.everyItem().texts[0].pointSize = "6 pt"
        table.rows[0].cells[0].merge(table.rows[0].cells[1])
        table.columns[1].cells.everyItem().texts[0].appliedFont = font[2]
        table.rows[0].cells.everyItem().texts[0].appliedFont = font[1]
        for (j = 0; j < RegDB_column.length; j++) {
            RegDB_column[j] == "€uros" ? table.columns[j + 1].cells[0].texts[0].appliedFont = "Arial" : null
            for (k = 1; k < table.columns[j + 1].cells.length; k++) {
                RegDB_column[j] == "€uros" ? table.columns[j + 1].cells[k].texts[0].appliedFont = font[2] : null
                RegDB_column[j] == "Refrig_Kg" ? table.columns[j + 1].cells[k].texts[0].appliedFont = "Arial" : null
                RegDB_column[j] == "€uros" ? table.columns[j + 1].cells[k].texts[0].fillColor = doc.swatches.itemByName("C=98 M=55 Y=55 K=5") : null
            }
        }
        table.cells.everyItem().height = 3
        table.parent.fit(FitOptions.FRAME_TO_CONTENT)
        return table.parent.geometricBounds[2] + 1
    }
    return y
}
ArrayTable2 = [
    ["Cat._PED", 0, 6],
    ["Consumo_W", 0, 6],
    ["Consumo_kW", 1, 6],
    ["Consumo_A", 2, 7],
    ["Consumo_EERREF", 2, 10],
    ["Consumo_TN_kW", 1, 6],
    ["Consumo_TN_A   ", 1, 6],
    ["Consumo_BT_Kw", 1, 6],
    ["Consumo_BT_A", 1, 6],
    ["Compresor_Tipo", null, 6],
    ["Compresor_CC", 1, 9.5],
    ["Compresor_MRA", 1, 6],
    ["Compresor_m3/h", 1, 6],
    ["Compresor_Exp.", null, 6],
    ["Circuito de agua +15ºC_-5ºC", 2, 6],
    ["Circuito de agua +15ºC_0ºC", 2, 6],
    ["Circuito de agua +15ºC_+5ºC", 2, 6],
    ["Circuito de agua +15ºC_-25ºC", 2, 6],
    ["Circuito de agua +15ºC_-20ºC", 2, 6],
    ["Circuito de agua +15ºC_-15ºC", 2, 6],
    ["Circuito de agua +15ºC_Caudal_m3/h", 2, 9],
    ["Circuito de agua +15ºC_Qcond._W", 0, 6],
    ["Circuito de agua +15ºC_Pcarga_kPa", 0, 9],
    ["Circuito de agua +15ºC_Vent.Aux.", null, 10],
    ["Circuito de agua +15ºC_Conex.", null, 10],
    ["Circuito de agua +15ºC_Desag._Ømm", 0, 10],
    ["Condensador_Nº", 0, 6],
    ["Condensador_Ømm", 0, 6],
    ["Condensador_Caudal", 0, 8],
    ["Gas Cooler_Nº", 0, 6],
    ["Gas Cooler_Ømm", 0, 8],
    ["Gas Cooler_Caudal", 0, 8],
    ["Gas Cooler_IN", null, 6],
    ["Gas Cooler_OUT", null, 6],
    ["Gas Cooler_kW", 0, 6],
    ["Evaporador_Exp.", null, 6],
    ["Evaporador_Des.", null, 6],
    ["Evaporador_Wdes.", 0, 6],
    ["Evaporador_Nº", 0, 6],
    ["Evaporador_Ømm", 0, 8],
    ["Evaporador_Caudal", 0, 8],
    ["Evaporador_Flecha", 0, 8],
    ["Conexiones_Líquido", null, 19],
    ["Conexiones_Aspiración", null, 19],
    ["Conexiones_Circuito de agua", null, 12],
    ["Conexiones_Descarga", null, 6],
    ["Presiones de Diseño - PS bar_Descarga", 0, 10],
    ["Presiones de Diseño - PS bar_Aspiración", 0, 10],
    ["Presiones de Diseño - PS bar_Pglicol", 0, 10],
    ["1m_dB(A)", 1, 8],
    ["10m_dB(A)", 1, 8],
    ["Nivel Sonoro [dB(A) 10m]_Sin aislamiento", 1, 16],
    ["Nivel Sonoro [dB(A) 10m]_Con aislamiento", 1, 16],
    ["Nivel Sonoro [dB(A) 10m]_Máx rpm", 1, 6],
    ["Nivel Sonoro [dB(A) 10m]_Valor medio 24h", 1, 10],
    ["Recip._L", null, 6],
    ["Peso_Kg", 0, 6],
    ["Peso_Cond.", 0, 6],
    ["Peso_Evap.", 0, 6],
    ["Dimensiones_Ancho", 0, 6],
    ["Dimensiones_Fondo", 0, 6],
    ["Dimensiones_Alto", 0, 6],

]

function TableDades(x, y, DBPage, DB, i) {

    table = docpages[i].textFrames.add({
        contents: "MODELO",
        geometricBounds: [y, x, y + 183.3, x + 148.75]
    })
    table = table.texts[0].convertToTable()
    T_row = 0, T_column = 0, RegDB_row = [], RegDB_column = ["Ref"]
    for (j = 0, DBlength = DB.length; j < DBlength; j++) {
        if (DBPage[i]["Seccion"] == DB[j]["Seccion"]) {
            table.rows.add(LocationOptions.AT_END)
            T_row++
            RegDB_row.push(j)
            table.rows.lastItem().cells.lastItem().contents = DB[j]["Ref"].split("*")[0]
        }
    }
    table.columns[0].width = 24
    if (table.rows.length == 1) {
        table.parent.fit(FitOptions.FRAME_TO_CONTENT)
        table.remove()
    } else {
        table.rows[0].fillColor = doc.swatches.itemByName("PANTONE 425 C 24 17%")
        for (j = 0, arrayLength = ArrayTable2.length; j < arrayLength; j++) {
            if (DBPage[i][ArrayTable2[j][0]]) {
                table.columns.add(LocationOptions.AT_END)
                T_column++
                RegDB_column.push(ArrayTable2[j][0])
                for (k = 0; k < T_row; k++) {
                    table.rows[k + 1].cells.lastItem().contents = Intl(DB[RegDB_row[k]][ArrayTable2[j][0]], ArrayTable2[j][1])
                    ArrayTable2[j][0] == "Compresor_CC" && DB[RegDB_row[k]]["Compresor_Nº"] > 1 ? table.rows[k + 1].cells.lastItem().contents = DB[RegDB_row[k]]["Compresor_Nº"] + " x " + Intl(DB[RegDB_row[k]][ArrayTable2[j][0]], 1) : null
                    table.rows[k + 1].cells.lastItem().texts[0].pointSize = DB[RegDB_row[k]][ArrayTable2[j][0]] == "Ref" ? "7 pt" : "6 pt"
                    if (k % 2 == 1) {
                        table.rows[k + 1].fillColor = doc.swatches.itemByName("PANTONE 425 C 24 17%")
                    }
                }
                table.columns.lastItem().width = ArrayTable2[j][2]
            }
        }
        //AP
        table.columns.add(LocationOptions.AT_BEGINNING)
        for (j = 1, rowslength = table.columns[0].cells.length; j < rowslength; j++) {
            if (j == 1 || DB[RegDB_row[j - 1]]["AP"] != DB[RegDB_row[j - 2]]["AP"]) {
                table.rows[j].cells[0].contents = DB[RegDB_row[j - 1]]["AP"]
                if (DB[RegDB_row[j - 1]]["AP"] === "AT") {
                    table.rows[j].cells[0].fillColor = doc.swatches.itemByName("r229g175b18")
                } else if (DB[RegDB_row[j - 1]]["AP"] === "BT") {
                    table.rows[j].cells[0].fillColor = doc.swatches.itemByName("r120g149b206")
                } else if (DB[RegDB_row[j - 1]]["AP"] === "TN") {
                    table.rows[j].cells[0].fillColor = doc.swatches.itemByName("r200g218b3")
                } else {
                    table.rows[j].cells[0].fillColor = doc.swatches.itemByName("r120g149b206")
                }
                k = j
            } else {
                table.rows[k].cells[0].merge(table.rows[j].cells[0])
            }
        }
        table.rows.add(LocationOptions.AFTER, table.rows[0])
        table.rows.add(LocationOptions.AFTER, table.rows[0])
        table.cells.everyItem().topEdgeStrokeWeight = 0
        table.cells.everyItem().bottomEdgeStrokeWeight = 0
        table.cells.everyItem().leftEdgeStrokeWeight = 0
        table.cells.everyItem().rightEdgeStrokeWeight = 0
        for (j = 0; j < 3; j++) {
            table.rows[j].cells.everyItem().topEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().topEdgeStrokeColor = doc.swatches.itemByName("Paper")
            table.rows[j].cells.everyItem().bottomEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().bottomEdgeStrokeColor = doc.swatches.itemByName("Paper")
            table.rows[j].cells.everyItem().leftEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().leftEdgeStrokeColor = doc.swatches.itemByName("Paper")
            table.rows[j].cells.everyItem().rightEdgeStrokeWeight = 0.25
            table.rows[j].cells.everyItem().rightEdgeStrokeColor = doc.swatches.itemByName("Paper")
        }
        ArrayMerge = []
        table.rows[0].cells.everyItem().texts[0].appliedFont = font[2]
        for (j = 2, DBcolumnlength = table.rows[0].cells.length; j < DBcolumnlength; j++) {
            RegDB_column[j - 1].split("_")[0] == RegDB_column[j - 2].split("_")[0] ? ArrayMerge.push(j) : table.columns[j].cells[0].contents = RegDB_column[j - 1].split("_")[0].toString()
            if (RegDB_column[j - 1].split("_").length > 2) {
                table.columns[j].cells[1].contents = RegDB_column[j - 1].split("_")[1]
                table.columns[j].cells[2].contents = RegDB_column[j - 1].split("_")[2]
            } else if (RegDB_column[j - 1].split("_").length > 1) {
                table.columns[j].cells[1].contents = RegDB_column[j - 1].split("_")[1]
                table.columns[j].cells[1].merge(table.columns[j].cells[2])
            } else {
                table.columns[j].cells[0].merge(table.columns[j].cells[1])
                table.columns[j].cells[0].merge(table.columns[j].cells[1])
            }
        }
        for (j = 0; j < ArrayMerge.length; j++) {
            table.rows[0].cells[ArrayMerge[j] - j].merge(table.rows[0].cells[ArrayMerge[j] - 1 - j])
        }
        table.rows[0].cells[0].merge(table.rows[2].cells[1])
        table.columns[0].width = 3
        table.columns[0].rotationAngle = 270
        table.rows[0].rotationAngle = 0
        table.cells.everyItem().texts[0].appliedFont = font[0]
        table.cells.everyItem().texts[0].leading = "8.4 pt"
        table.cells.everyItem().texts[0].pointSize = "6 pt"
        table.cells.everyItem().texts[0].justification = Justification.CENTER_ALIGN
        table.cells.everyItem().appliedCellStyle = doc.cellStyles.itemByName("TablaPotencia")
        table.columns[1].cells.everyItem().texts[0].appliedFont = font[2]
        table.cells.everyItem().height = 3
        table.parent.fit(FitOptions.FRAME_TO_CONTENT)
        return table.parent.geometricBounds[2] + 0.5
    }
    return y
}

function TextFramesTableLabel(x, y, DBPage, DB, i, PageType) {
    table = docpages[i].textFrames.add({
        contents: "textFrames",
        geometricBounds: [y, x, y + 20, x + 148.75],
    })
    table = table.texts[0].convertToTable()
    if (PageType == "Principal") {
        if (!DBPage[i]["Gas Cooler Remoto"]) {
            table.rows.lastItem().contents = "P. Frigorífica: Gas Aspiración: 0°C(BT) y +20°C(TN) - Subenfriamiento: 0°K - Recalentamiento útil: 100%. - Según UE 2015/1095"
        } else {
            table.rows.lastItem().contents = "P. Frigorífica: Temperatura ambiente +32ºC - Salida gas cooler +39ºC - Presión intermedia 36 bar - Presión óptima al gas cooler 90 bar."
        }
        if (DBPage[i]["COP"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "COP Calculado con Tc 0°C(TN) y -20°C(BT) con T ambiente +32°C."
        } else if (DBPage[i]["COP"] && DBPage[i]["FormatoTempEvap"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "COP Calculado con Tr -10°C(TN) y -30°C(BT) con T ambiente +32°C."
        } else if (DBPage[i]["SERP"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "SERP Calculado con Tc 0°C(TN) y -20°C(BT) con T ambiente +32°C."
        }
        if (DBPage[i]["Gas Cooler_kW"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "Gas Cooler DT = 3K. Recalentamiento TN 10 K y BT 10 K."
        }
        if (DBPage[i]["Refrigerante"] == "R290") {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "R290 La carga respeta el límite establecido de 150g por circuito, permitiendo el montaje del equipo sin sala de máquinas y sin ninguna restricción."
        }
        if (DBPage[i]["HP"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "HP de Ref.: Este valor solo se indica como referencia comercial."
        }
        if (DBPage[i]["Gama"] == "BESTW" || DBPage[i]["Gama"] == "BESTCM") {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "*Modelos disponibles alimentación 400/3/50, precio +3%."
        }
    } else if (PageType == "Datos") {
        table.rows.lastItem().contents = "H hermético - SH semihermético - Sc scroll — C capilar - V válvula de expansión — A aire - E eléctrico - G gas caliente"

        if (DBPage[i]["10m_dB(A)"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "Suponiendo una superficie semiesférica en campo abierto. Si se considera una superficie paralepipeda los niveles se reducen de 3 a 5 dB(A)"
        }
        if (DBPage[i]["Consumo_W"] && DBPage[i]["Gas Cooler Remoto"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "Consumo eléctrico: Te -10ºC (TN) y Te -30ºC (BT) con T amb. +32ºC. Salida gas cooler +39ºC. Presión intermedia 36 bar. Presión óptima a gas cooler 90 bar."
        } else if (DBPage[i]["Consumo_W"]) {
            table.rows.add(LocationOptions.AT_END)
            table.rows.lastItem().contents = "Potencia absorbida equipo: Te -10ºC (TN) y Te -30ºC (BT) con Tcond +50º - EN12900"
        }
    } else {
        return y
    }
    table.cells.everyItem().texts[0].appliedFont = font[0]
    table.cells.everyItem().texts[0].pointSize = "5.5 pt"
    table.cells.everyItem().height = 3
    table.cells.everyItem().topEdgeStrokeWeight = 0
    table.cells.everyItem().bottomEdgeStrokeWeight = 0
    table.cells.everyItem().leftEdgeStrokeWeight = 0
    table.cells.everyItem().rightEdgeStrokeWeight = 0
    table.cells.everyItem().appliedCellStyle = doc.cellStyles.itemByName("TablaPotencia")
    table.parent.fit(FitOptions.FRAME_TO_CONTENT)
    return table.parent.geometricBounds[2]
}

function TextFramesElement(Path, x1, y1, i, Element) {
    if (Element) {
        frame = docpages[i].textFrames.add({
            contents: "MODELO",
            geometricBounds: [y1, x1, y1 + 183.3, x1 + 148.75]
        })
        frame.place(File(Path + Element + ".jpg"))
        frame.fit(FitOptions.FRAME_TO_CONTENT)
        frame.move([x1, y1])
        return x1, y1 + 10
    }
    return x1, y1
}