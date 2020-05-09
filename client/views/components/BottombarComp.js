let BottombarComp = {
    render: async () => {
        let view =  /*html*/`
        <div class="col"></div>
        <div class="">
          <a class="nav-link" href="javascript:void(0)" id="btnAlert" data-toggle="popover" data-placement="top" data-url="/alert.html" data-target="#pnlAlert" data-original-title="" title="" aria-describedby="popover603907">
            <i class="fa fa-bell"></i>
            <span class="badge badge-pill badge-danger" id="nroAlertas"></span>
          </a>
        </div>
        <span><a href="#"></a> © 2019 YPFB-GTIC</span>
        <div class="col"></div>
        `
        return view
    },
    after_render: async () => { }

}

export default BottombarComp;