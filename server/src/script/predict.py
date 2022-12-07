import time
import sys
import json

folder_name = 'cache/'

def main(filename: str):
    time.sleep(2)
    print('Test Script complete {}'.format(filename))
    with open (f'{folder_name}{filename}.json', 'r') as f:
        line = f.readline()
        print(line)

    with open(f'{folder_name}{filename}.out.json', 'w') as f:
        json.dump({
            "a":"apple",
            "b":"banana"
        }, f)

if __name__ =="__main__":
    main(sys.argv[1])
