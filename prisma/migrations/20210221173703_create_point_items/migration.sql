-- CreateTable
CREATE TABLE "point_items" (
    "id" TEXT NOT NULL,
    "point_id" TEXT NOT NULL,
    "item_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "point_items" ADD FOREIGN KEY ("point_id") REFERENCES "Points"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "point_items" ADD FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
