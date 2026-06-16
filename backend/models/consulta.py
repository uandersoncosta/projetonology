import uuid
from sqlalchemy import Uuid
from sqlalchemy import func
from database.db import db

class Consulta(db.Model):
    __tablename__ = "consultas"

    id = db.Column(Uuid, primary_key=True, default=uuid.uuid4)
    ip = db.Column(db.String(50), nullable=False)
    tipo_cliente = db.Column(db.String(20), nullable=False)
    valor_compra = db.Column(db.Float, nullable=False)
    desconto = db.Column(db.Float, nullable=False)
    cashback = db.Column(db.Float, nullable=False)

    def as_dict(self):
        return {
            "id": str(self.id),
            "ip": self.ip,
            "tipo_cliente": self.tipo_cliente,
            "valor_compra": self.valor_compra,
            "desconto": self.desconto,
            "cashback": self.cashback
        }