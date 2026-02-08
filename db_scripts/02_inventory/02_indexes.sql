BEGIN;

CREATE INDEX IF NOT EXISTS idx_stock_movements_product_created ON stock_movements (product_id, created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_product_stock_product_id ON product_stock (product_id);

COMMIT;
