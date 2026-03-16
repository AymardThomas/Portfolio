
let mx, my = 0;
let sidebar, lim;
let to_hide = [];
let discover;
let changed = false;

function set_lim(n){
    lim=n
}

function set_discover(n){
    discover = n
}

async function updateSidebar(){
    if(mx < discover){
        sidebar.classList.remove('hidden');
    }
    else{
        sidebar.classList.add('hidden');
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
    sidebar = document.getElementById('sidebar');
    lim = sidebar.getBoundingClientRect().width
    discover = 75
    document.addEventListener("mousemove", async (e) => {
        mx = e.clientX;
        my = e.clientY;
        await updateSidebar()
    })
})



