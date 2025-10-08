-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "naam" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "opdrachtgever" TEXT NOT NULL,
    "adres" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "plaats" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "kabellengte" REAL NOT NULL,
    "nutsvoorzieningen" TEXT NOT NULL,
    "soortAansluiting" TEXT NOT NULL,
    "capaciteit" REAL NOT NULL,
    "soortVerharding" TEXT NOT NULL,
    "boringNoodzakelijk" BOOLEAN NOT NULL,
    "traceBeschrijving" TEXT,
    "kruisingen" TEXT,
    "obstakels" TEXT,
    "buurtInformeren" BOOLEAN NOT NULL,
    "buurtNotitie" TEXT,
    "wegafzettingNodig" BOOLEAN NOT NULL,
    "wegafzettingPeriode" TEXT,
    "vergunningen" TEXT,
    "bijzondereRisicos" TEXT,
    "uitvoerder" TEXT NOT NULL,
    "toezichthouder" TEXT NOT NULL,
    "bereikbaarheden" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "exifData" TEXT,
    "ocrText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Photo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "findings" TEXT NOT NULL,
    "risks" TEXT NOT NULL,
    "actions" TEXT NOT NULL,
    "citations" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Inspection_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Report_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");
