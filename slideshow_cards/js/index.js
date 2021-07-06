const createSlider = (activeSlide = 0, timeout=3000) => {

    const slides = document.querySelectorAll('.slide');
    const body = document.getElementsByTagName('body')[0];

    const bgStyles = {
        0: "rgba(0, 0, 0, 0) linear-gradient(45deg, rgba(135, 150, 181, 0.86), rgb(252, 182, 148)) repeat scroll 0% 0%",
        1: "rgba(0, 0, 0, 0) linear-gradient(60deg, rgba(183, 212, 243, 0.64), rgb(40, 62, 102)) repeat scroll 0% 0%",
        2: "rgba(0, 0, 0, 0) linear-gradient(90deg, rgba(165, 121, 161, 0.64), rgb(50, 76, 101)) repeat scroll 0% 0%",
        3: "rgba(0, 0, 0, 0) linear-gradient(45deg, rgba(96, 105, 104, 0.54), rgba(78, 82, 60, 0.85)) repeat scroll 0% 0%",
        4: "rgba(0, 0, 0, 0) linear-gradient(70deg, rgba(124, 25, 10, 0.5), rgb(154, 174, 190)) repeat scroll 0% 0%"
    }

    slides[activeSlide].classList.add('active');
    
    const clearActiveClasses = () => {
        slides.forEach(slide => slide.classList.remove('active'))
    }

    const changeSlide = (time) => {
        setInterval(() => {
            let currentSlide = [...slides].findIndex(slide => slide.classList.contains('active'));
            let lastIndex = slides.length - 1;
            body.style.background = bgStyles[currentSlide + 1];
            if (currentSlide === lastIndex) {
                clearActiveClasses();
                slides[0].classList.add('active')
            } else {
                clearActiveClasses();
                console.log(slides[currentSlide]);
                slides[currentSlide + 1].classList.add('active');
            }
        }, time);
    }

    changeSlide(timeout);

    
    for (const slide of slides) {
        const idx = [...slides].findIndex(item => item===slide);
        body.style.background = bgStyles[idx];

        slide.addEventListener('click', (e) => {
            body.style.background = bgStyles[idx];
            clearActiveClasses(slides);
            slide.classList.add('active');
        });
    }





}




createSlider();
