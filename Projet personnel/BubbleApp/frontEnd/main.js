let bubbles;
document.addEventListener("DOMContentLoaded", async () => {
    let scroller = document.getElementById("scroller")
    let empty = document.createElement("div")
    let bubbles = []
    const offset = (window.innerWidth * 0.16) / 6;
    let sidebar = document.getElementById('sidebar');
    await fetch("../bubbles.txt")
        .then((res) => res.text())
        .then((text) => {
            const lines = text.split(/\r?\n/);
            for (let i = 0; i < lines.length; i++) {
                let bubble = document.createElement("a");
                bubble.href = lines[i] + ".html"
                let bubble_img = document.createElement("img");
                bubble_img.src = "image/" + lines[i] + ".png"
                bubble_img.style.height = "3vw"
                bubble.append(bubble_img);
                bubble.classList.add("bubble");
                bubble.classList.add("hidden")
                addToHide(bubble)
                bubble.id = lines[i]
                sidebar.appendChild(bubble)
                bubble.style.position = "absolute";
                bubble.style.top = `calc(50% - 2vw + ${Math.cos(i*Math.PI / 4 + Math.PI/8)*100}px`;
                bubble.style.left = `calc(${Math.sin(i*Math.PI / 4 + Math.PI/8)*100}px`;
                bubbles[i] = bubble;
            }

            empty.style.visibility = "hidden";
            empty.style.height = `calc(${lines.length+2}*16vw/6)`;
            scroller.appendChild(empty);
        }
        )
        .then( () => {
            console.log(bubbles.length);
        })
        .catch((e) => console.error(e));

    scroller.addEventListener("scroll", () => {
        let bubble;
        for (let i = 0; i < bubbles.length; i++) {
            console.log(i);
            bubble = bubbles[i];
            bubble.style.top = `calc(50% - 2vw + ${Math.cos(((i-scroller.scrollTop/offset) * Math.PI) / 4 + Math.PI/8) * 100}px`;
            bubble.style.left = `calc(${Math.sin((i-scroller.scrollTop/offset) * Math.PI / 4 + Math.PI/8) * 100}px)`;
        }
    })
    set_discover(scroller.getBoundingClientRect().width + 75)
    set_lim(scroller.getBoundingClientRect().width)
})
