function GetDataFromExcelPC(excelFilePath, sheetNumber) {
    appVersionNum = Number(String(app.version).split(".")[0])
    vbs = 'Public s, excelFilePath\r';
    vbs += 'Function ReadFromExcel()\r';
    vbs += 'On Error Resume Next\r';
    vbs += 'Err.Clear\r';
    vbs += 'Set objExcel = CreateObject("Excel.Application")\r';
    vbs += 'Set objBook = objExcel.Workbooks.Open("' + excelFilePath + '")\r';
    vbs += 'Set objSheet =  objExcel.ActiveWorkbook.WorkSheets(' + sheetNumber + ')\r';
    vbs += 's = s & "[" & objSheet.Name & "]"\r';
    vbs += 'objExcel.Visible = True\r';
    vbs += 'matrix = objSheet.UsedRange\r';
    vbs += 'maxDim0 = UBound(matrix, 1)\r';
    vbs += 'maxDim1 = UBound(matrix, 2)\r';
    vbs += 'For i = 1 To maxDim0\r';
    vbs += 'For j = 1 To maxDim1\r';
    vbs += 'If j = maxDim1 Then\r';
    vbs += 's = s & matrix(i, j)\r';
    vbs += 'Else\r';
    vbs += 's = s & matrix(i, j) & ";"\r';
    vbs += 'End If\r';
    vbs += 'Next\r';
    vbs += 's = s & vbCr\r';
    vbs += 'Next\r';
    vbs += 'objBook.close\r';
    vbs += 'Set objSheet = Nothing\r';
    vbs += 'Set objBook = Nothing\r';
    vbs += 'Set objExcel = Nothing\r';
    vbs += 'SetArgValue()\r';
    vbs += 'On Error Goto 0\r';
    vbs += 'End Function\r';
    vbs += 'Function SetArgValue()\r';
    vbs += 'Set objInDesign = CreateObject("InDesign.Application")\r';
    vbs += 'objInDesign.ScriptArgs.SetValue "excelData", s\r';
    vbs += 'End Function\r';
    vbs += 'ReadFromExcel()\r';
    appVersionNum > 5 ? app.doScript(vbs, ScriptLanguage.VISUAL_BASIC, undefined, UndoModes.FAST_ENTIRE_SCRIPT) : app.doScript(vbs, ScriptLanguage.VISUAL_BASIC);
    str = app.scriptArgs.getValue("excelData");
    app.scriptArgs.clear();
    data = str.split("Modelo]")
    data = data[1].split("\r")
    data2 = []
    for (j = 0, lengthj = data.length - 1; j < lengthj; j++) {
        data2[j] = []
        for (i = 0, lengthi = data[0].split(";").length; i < lengthi; i++) {
            data2[j][data[0].split(";")[i]] = data[j + 1].split(";")[i]
        }
    }

    return data2
}