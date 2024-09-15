(function() {
    function createImageSlider(options) {
        const { containerSelector, images, autoSlideInterval } = options;

        // HTML 结构
        const container = document.querySelector(containerSelector);
        const slider = document.createElement('div');
        slider.className = 'image-slider';
        images.forEach((img) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const image = document.createElement('img');
            image.src = img;
            slide.appendChild(image);
            slider.appendChild(slide);
        });
        container.appendChild(slider);

        // CSS 样式
        const style = document.createElement('style');
        style.innerHTML = `
            .image-slider {
                position: relative;
                width: 100%;
                height: 300px;
                overflow: hidden;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .slide {
                position: absolute;
                width: 100%;
                height: 100%;
                display: none;
                transition: opacity 1s ease-in-out;
            }
            .slide img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
            }
            .slide.active {
                display: block;
                opacity: 1;
            }
            .slide:not(.active) {
                opacity: 0;
            }
            .slider-nav {
                position: absolute;
                top: 50%;
                width: 100%;
                display: flex;
                justify-content: space-between;
                transform: translateY(-50%);
            }
            .slider-nav button {
                background-color: rgba(0,0,0,0.5);
                border: none;
                color: white;
                padding: 10px;
                cursor: pointer;
                border-radius: 50%;
                font-size: 20px;
            }
            .slider-nav button:hover {
                background-color: rgba(0,0,0,0.8);
            }
        `;
        document.head.appendChild(style);

        // JavaScript 功能
        let currentIndex = 0;
        function showSlide(index) {
            const slides = slider.querySelectorAll('.slide');
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        function autoSlide() {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showSlide(currentIndex);
            }, autoSlideInterval || 3000);
        }

        function createNav() {
            const nav = document.createElement('div');
            nav.className = 'slider-nav';
            const prevButton = document.createElement('button');
            prevButton.textContent = '‹';
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                showSlide(currentIndex);
            });
            const nextButton = document.createElement('button');
            nextButton.textContent = '›';
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % images.length;
                showSlide(currentIndex);
            });
            nav.appendChild(prevButton);
            nav.appendChild(nextButton);
            slider.appendChild(nav);
        }

        showSlide(currentIndex);
        autoSlide();
        createNav();
    }

    // 示例使用
    document.addEventListener('DOMContentLoaded', () => {
        createImageSlider({
            containerSelector: '.image-slider-container',
            images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
            autoSlideInterval: 3000
        });
    });
})();
