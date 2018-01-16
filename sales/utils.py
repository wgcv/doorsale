

def get_last_id_as_order_receipt_id(_orders_):
        orders = _orders_
        _id_ = orders.id
        if len(str(_id_)) == 1:
            return '000000000{}'.format(_id_)
        elif len(str(_id_)) == 2:
            return '00000000{}'.format(_id_)
        elif len(str(_id_)) == 3:
            return '0000000{}'.format(_id_)
        elif len(str(_id_)) == 4:
            return '000000{}'.format(_id_)
        elif len(str(_id_)) == 5:
            return '00000{}'.format(_id_)
        elif len(str(_id_)) == 6:
            return '0000{}'.format(_id_)
        elif len(str(_id_)) == 7:
            return '000{}'.format(_id_)
        elif len(str(_id_)) == 8:
            return '00{}'.format(_id_)
        elif len(str(_id_)) == 9:
            return '0{}'.format(_id_)
        else:
            return '{}'.format(_id_)