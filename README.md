# Teamorientiertes Praktikum

Im Rahmen des Teamorientierten Praktikums haben wir uns dafür entschieden, den SB-Service zu überarbeiten.

## System starten

Um das Frontend zu starten müssen folgende Schritte ausgeführt werden:

```bash
# Dependencies installieren, durch Sveltestrap ist --legacy-peer-deps nötig
npm install --legacy-peer-deps

# Entwicklungsumgebung starten
npm run dev
```

## System exportieren

Um die Software lauffähig auf einem externen Server zu machen, muss sie zuvor
gebaut werden.

```bash
# Bauprozess starten, ggf ist wieder --legacy-peer-deps nötig
npm run build --legacy-peer-deps
```

Es wird ein fertiger Node-Server erstellt, der dann ausgeführt werden kann.

Dafür den erzeugten `build`-Ordner und `package.json` sowie `package-lock.json` an den gewünschten Ort verschieben

```bash
# Node-Server starten
ORIGIN=<Server-Adresse> node ./build
```
