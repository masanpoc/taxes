// possible tests with jest
const input = "1 frasco de perfume importado a 27,99 € 1 frasco de perfume a 18,99 € 1 caja de pastillas para el dolor de cabeza a 9,75 € 1 caja de bombones importados a 11,25 €"
const db_Products  = [
    'libro',
    'CD de música',
    'barrita de chocolate',
    'caja de bombones',
    'frasco de perfume',
    'caja de pastillas para el dolor de cabeza',
]


describe('Input string validation', ()=>{
    it('input contains prices in format XX,XX €', ()=>{
        expect(input).toMatch(/([0-9]+),([0-9][0-9]) €/g)
    })
    it('input contains quantity in format number', ()=>{
        expect(input).toMatch(/([0-9]+) [a-z]/gi)
    })
    it('every product is in database', ()=> {
        let inputArray=input.split('€').map(el=>el.trim());
        inputArray.pop();
        
        let productNames = inputArray.map(str=>{
            let product = str.split(' a ')[0].split(' ');
            product.shift();
            if(product.includes('importado') || product.includes('importados')){
                imported=true;
                product.pop();
            }
            product=product.join(' ')
            return product
        })

        productNames.forEach(productName => {
            expect(db_Products).toContain(productName)
        })
    })
})
