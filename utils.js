class SlideShow {
    constructor(slideContainer, autoNext=true, timeout=6000){
        this.slideContainer = slideContainer;
        this.autoNext = autoNext;
        this.slideIndex = 0;
        this.timeoutTime = timeout;
        this.showSlides(this.slideIndex);
    }

    showSlides(n){
        let slides = this.slideContainer.querySelectorAll(".slides");
        let dots = this.slideContainer.querySelectorAll(".dot");
        if (n >= slides.length) this.slideIndex = 0;
        if (n < 0) this.slideIndex = slides.length - 1;
        slides.forEach(s => s.style.display = "none");
        dots.forEach(d => d.className = d.className.replace("active", ""));
        slides[this.slideIndex].style.display = "block";
        if(dots[this.slideIndex]) dots[this.slideIndex].className += " active";
        if (this.autoNext){
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => this.showSlides(this.slideIndex + 1), this.timeoutTime);
        }
    }
}

class Modal {
    constructor(modal, title, description){
        this.modal = modal;
        this.updateModal(title, description);
        modal.querySelector("#modal-close").addEventListener("click", () => this.close());
    }
    close(){ this.modal.classList.add("tw-hidden"); }
    show(){ this.modal.classList.remove("tw-hidden"); }
    updateModal(t, d){
        this.modal.querySelector("#modal-title").textContent = t;
        this.modal.querySelector("#modal-description").textContent = d;
    }
    updateButton(text, link){
        const btn = this.modal.querySelector("#modal-action-btn");
        btn.textContent = text;
        if(link) btn.setAttribute("href", link);
    }
    showModalInput(){ this.modal.querySelector("#modal-input").classList.remove("tw-hidden"); }
    hideModalInput(){ this.modal.querySelector("#modal-input").classList.add("tw-hidden"); }
}
