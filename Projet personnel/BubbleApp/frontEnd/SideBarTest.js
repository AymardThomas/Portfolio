
let mx, my = 0;
let toHide = [];
let changed = false;
let discover, lim;

function set_lim(n){
    lim=n
}

function set_discover(n){
    discover = n
}
function addToHide(elt){
    toHide.push(elt);
}

async function updateSidebar(){
    if(mx < discover){
        for(let i of toHide){

            i.classList.remove("hidden");
        }
    }
    else{

        for(let i of toHide){
            i.classList.add("hidden");
        }
    }
    state = await ClickThrough.getClickThrough()
    console.log(changed, state, mx < lim, mx > lim)
    if(!changed && state && mx < lim){
        if(await ClickThrough.changeState()){
            win.focus()
        }
        changed = true;
    }
    else if(changed && mx > lim){
        if(await ClickThrough.changeState()){
            win.focus()
        }
        changed = false;
    }


}

document.addEventListener('DOMContentLoaded', async () => {
    let sidebar = document.getElementById('sidebar')
    toHide.push(sidebar)
    lim = sidebar.getBoundingClientRect().width
    discover = 75
    document.addEventListener("mousemove", async (e) => {
        mx = e.clientX;
        my = e.clientY;
        console.log(toHide.length);
        await updateSidebar()
    })
})