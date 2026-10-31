const menuButton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

document.querySelectorAll("[data-image-fallback]").forEach((image) => {
  image.addEventListener("error", () => {
    const frame = image.closest(".screenshot-frame");
    if (!frame) return;

    frame.innerHTML = `
      <div class="screenshot-placeholder">
        Add <strong>${image.getAttribute("src")}</strong> to display this screenshot.
      </div>
    `;
  });
});

const showcaseTabs = [...document.querySelectorAll('[data-showcase]')];
function selectShowcase(tab){
 showcaseTabs.forEach(button=>{const active=button===tab;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;document.getElementById('showcase-'+button.dataset.showcase).hidden=!active;});
}
showcaseTabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectShowcase(tab));tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%showcaseTabs.length;else if(event.key==='ArrowLeft')next=(index+showcaseTabs.length-1)%showcaseTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=showcaseTabs.length-1;else return;event.preventDefault();selectShowcase(showcaseTabs[next]);showcaseTabs[next].focus();});});

const appViewer = document.getElementById('app-viewer');
if(appViewer){
 const pageSets={
 windows:[['trainer-home-097.png','Home'],['trainer-training-097.png','Training'],['trainer-nutrition-097.png','Nutrition & hydration']],
 android:[['android-home-074.png','Home'],['android-training-overview-074.png','Training overview'],['android-training-074.png','Prescribed workout'],['android-nutrition-074.png','Nutrition & hydration'],['android-more-074.png','More & navigation'],['android-package-review-074.png','Review a Trainer package']]
 };
 let viewerPlatform='windows',viewerIndex=0,viewerTrigger=null;
 const viewerImage=document.getElementById('viewer-image');
 function showViewerPage(){const pages=pageSets[viewerPlatform];const page=pages[viewerIndex];const label=viewerPlatform==='windows'?'Windows Trainer · 0.30.00.097':'Android Personal · 0.80.00.074';viewerImage.src='images/'+page[0];viewerImage.alt=label+' — '+page[1];document.getElementById('app-viewer-title').textContent=page[1];document.getElementById('viewer-platform').textContent=label;document.getElementById('viewer-count').textContent=(viewerIndex+1)+' of '+pages.length;}
 function moveViewer(delta){viewerIndex=(viewerIndex+delta+pageSets[viewerPlatform].length)%pageSets[viewerPlatform].length;showViewerPage();}
 document.querySelectorAll('[data-app-viewer]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();viewerTrigger=link;viewerPlatform=link.dataset.appViewer;viewerIndex=0;showViewerPage();appViewer.showModal();document.documentElement.style.overflow='hidden';}));
 document.getElementById('viewer-close').addEventListener('click',()=>appViewer.close());
 document.getElementById('viewer-prev').addEventListener('click',()=>moveViewer(-1));document.getElementById('viewer-next').addEventListener('click',()=>moveViewer(1));
 appViewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();moveViewer(1);}else if(event.key==='ArrowLeft'){event.preventDefault();moveViewer(-1);}});
 appViewer.addEventListener('close',()=>{document.documentElement.style.overflow='';if(viewerTrigger)viewerTrigger.focus();});
}
