from sqlalchemy.dialects.mysql import UUID
from sqlalchemy import func
from database.db import db

class Consulta(db.Model):
    __tablename__ = "consultas"

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=func.uuid_generate_v4())
    ip = db.Column(db.String(50), nullable=False)
    tipo_cliente = db.Column(db.String(20))
    valor_compra = db.Column(db.Float)
    desconto = db.Column(db.Float)
    cashback = db.Column(db.Float)
    
    def as_dict(self):
        return {
            "id": str(self.id),
            "ip": self.ip,
            "tipo_cliente": self.tipo_cliente,
            "valor_compra": self.valor_compra,
            "desconto": self.desconto,
            "cashback": self.cashback
        }