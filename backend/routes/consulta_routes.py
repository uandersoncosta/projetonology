from flask import Blueprint, request, jsonify
from database.db import db
from models.consulta import Consulta
from services.cashback_service import calcular_cashback

consultas_bp = Blueprint("consultas", __name__)

@consultas_bp.route("/consultas", methods=["GET"])
def consultas():
    ip = request.remote_addr

    consultas = Consulta.query.filter_by(ip=ip).all()

    return jsonify({
      "consultas": [
            {
                "id": consulta.id,
                "tipo_cliente": consulta.tipo_cliente,
                "valor_compra": consulta.valor_compra,
                "desconto": consulta.desconto,
                "cashback": consulta.cashback
            }
            for consulta in consultas
        ]
    }), 200