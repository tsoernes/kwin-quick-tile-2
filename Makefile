install:
	kpackagetool6 --type=KWin/Script -i .

update:
	kpackagetool6 --type=KWin/Script -u .

package:
	zip -r quick-tile-2-v$$(cat metadata.json | jq -r .KPlugin.Version).kwinscript contents/* LICENSE README.md metadata.json
