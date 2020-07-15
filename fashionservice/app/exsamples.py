def hello(name):
    print("Hello " + name)
    print("Bye " + name)
    return (name, name + "2")

lista = ["honda", "ford", "skoda"]
atuple = ("Heikki", 42, "insinööri")
aset = {"moi", "hei", "moi"}
adict = {"make": "Ford", "model": "Coucar", "year": 2005}

(_, nimi2) = hello("Jaakko")

print(lista)
print(atuple)
print(aset)
print(adict)

a = [1]
b = [1]

if a == b :
    print("Sama")
else:
    print("Eri")

print(5 + 2)
print(5 - 2)
print(5 * 2)
print(5 / 2)
print(5 % 2)

print(5 ** 2)
print(5 // 2)

for key, value in adict.items():
    print(key + ": " + str(value))

luvut = [1,2,3,4,5,6,7,8]
#luvut.filter(x => x % 2 === 0)
filteredLista = list(filter(lambda x: x % 2 == 0, luvut))
mappedLista = list(map(lambda x: str(x) + "!", luvut))
print(luvut)
print(filteredLista)
print(mappedLista)