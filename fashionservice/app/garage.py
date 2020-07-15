class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def printIt(self):
        print("Make: " + self.make + ", Model: " + self.model)

class Truck(Car):
    def __init__(self, make, model, maxCarry = 500):
        self.maxCarry = maxCarry
        super(Truck, self).__init__(make, model)
