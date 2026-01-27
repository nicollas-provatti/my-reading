-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    CONSTRAINT "Genre_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Genre" ("bookId", "id", "name") SELECT "bookId", "id", "name" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
