from flask import Blueprint, request, jsonify
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

    return jsonify({
        "cashback": resultado
    })