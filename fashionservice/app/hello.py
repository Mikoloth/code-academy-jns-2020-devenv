from garage import Car, Truck

auto1 = Car("BMW", "M3")
print(auto1.make)
auto1.printIt()

truck1 = Truck("Volvo", "AAA", 1000)
print(truck1.make)
truck1.printIt()
print(truck1.maxCarry)

truckOld1 = truck1;

truck1 = Truck("Volvo", "BBB")
print(truck1.make)
truck1.printIt()
print(truck1.maxCarry)

truckOld1.printIt()