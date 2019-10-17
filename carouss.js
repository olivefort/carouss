class Carousel { // création d'une class Carousel qui va correspondre au "new Carousel"
    
    /**
    *
    * @param (HTMLelement) element
    * @param (Object) options
    * @param (Object) options.slidesToScroll Nombre d'éléments à faire défiler
    * @param (Object) options.slideVisible Nombre d'éléments visible dans un slide
    */
    constructor (element, options = {}){//création d'un constructeur qui va avoir 2 paramettres
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1
        }, options)
        let children = [].slice.call(element.children);
        this.currentItem = 0;
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel_container');
        
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.items = children.map((child) => { //la grosse fleche est la nouvelle synthaxe pour les methode
            let item = this.createDivWithClass('carousel_item');
            
            item.appendChild(child);
            this.container.appendChild(item);
            return item
        })
        this.setStyle()
        this.createNavigation()
    }
    /**
    * applique les bonnes dimensions aux éléments du carousel
    */
    setStyle () {
        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")

    }
    
    
    createNavigation(){
        let nextButton = this.createDivWithClass('carousel_next');
        let prevButton = this.createDivWithClass('carousel_prev');
        this.root.appendChild(nextButton);
        this.root.appendChild(prevButton);
        nextButton.addEventListener('click', this.next.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
    }
    
    next(){
        this.goToItem(this.currentItem + this.options.slidesToScroll);
    }
    
    prev(){
        this.goToItem(this.currentItem - this.options.slidesToScroll);
    }
    
    
    /**
    * Déplace le carousel vers l'élément ciblé
    * @param {number} index
    */
    goToItem (index){
        let translateX = index * -100 / this.items.length
        this.container.style.transform = 'translate3d('+ translateX + '%,0,0)'
        this.currentItem = index;
    }
    /**
    *
    * @param {string} className
    * @returns {HTMLElement}
    */
    createDivWithClass (className){
        let div = document.createElement('div');
        div.setAttribute('class', className);
        return div
    }
}

document.addEventListener('DOMContentLoaded', function(){ // vu que le script est asynchrone on crée un évènement qui va lancer cette fonction :  
    new Carousel(document.querySelector('#carousel1'),{ 
    slidesToScroll: 1, //objets d'options
    slidesVisible: 3
})
})

