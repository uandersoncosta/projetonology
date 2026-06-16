from flask import Blueprint, request, jsonify
from database.db import db
from models.consulta import Consulta
from services.cashback_service import calcular_cashback

cashback_bp = Blueprint("cashback", __name__)

@cashback_bp.route("/cashback", methods=["POST"])
def cashback():

    dados = request.json

    valor = dados["valor"]
    desconto = dados["desconto"]
    tipo_cliente = dados["tipo_cliente"]

    resultado = calcular_cashback(
        valor,
        desconto,
        tipo_cliente == "VIP"
    )
    
    ip = request.remote_addr
    
    consulta = Consulta(
        ip=ip,
        tipo_cliente=tipo_cliente,
        valor_compra=valor,
        desconto=desconto,
        cashback=resultado
    )

    db.session.add(consulta)
    db.session.commit()

    return jsonify({
        "cashback": resultado
    })