Set WshShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Obter o caminho da pasta do script
strPath = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Definir NODE_ENV e executar npm run electron-dev de forma invisível
WshShell.Run "cmd.exe /c cd /d """ & strPath & """ && set NODE_ENV=development && npm run electron-dev", 0, false