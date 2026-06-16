def calcular_cashback(valor_compra, desconto, vip=False):
    valor_final = valor_compra * (1 - desconto / 100)

    cashback = valor_final * 0.05

    if vip:
        cashback += cashback * 0.10

    if valor_final > 500:
        cashback *= 2

    return round(cashback, 2)