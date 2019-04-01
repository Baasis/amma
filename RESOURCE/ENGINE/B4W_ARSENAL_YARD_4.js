"use strict"

b4w.register("B4W_ARSENAL_main", function(exports, require) {

var m_app       = require("app");
var m_cfg       = require("config");
var m_data      = require("data");
var m_preloader = require("preloader");
var m_ver       = require("version");
var m_nla   = require("nla");
var m_screen    = require("screen");
var m_cont      = require("container");

var DEBUG = (m_ver.type() == "DEBUG");

exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: true,
        console_verbose: DEBUG,
        //assets_dds_available: true,
        //assets_min50_available: true,
        //assets_gzip_available: true,
        autoresize: true,
    });
}

function init_cb(canvas_elem, success) {
    if (!success) {
        console.log("b4w init failure");
        return;   }
    m_preloader.create_preloader();
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;    };
    load();
}

function load() {
	var preloader_cont = document.getElementById("preloader_cont");
			preloader_cont.style.visibility = "visible";
			m_data.load("RESOURCE/DATA/B4W_ARSENAL_YARD_4.json", load_cb, preloader_cb);
      m_cfg.set("physics_uranium_path", "RESOURCE/URANIUM/");
      //m_cfg.set("physics_enabled", false);
}

function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
    var prelod_dynamic_path = document.getElementById("prelod_dynamic_path");
    prelod_dynamic_path.style.width = percentage + "%";
    if (percentage == 100) {
		    var preloader_cont = document.getElementById("preloader_cont");
				preloader_cont.style.visibility = "hidden";
  	  return;
    }
}

//**************  START APPLICATION  *******************************************************************************
function load_cb(data_id, success) {
	if (!success) {console.log("b4w load failure"); return;}
  m_nla.stop();
	main_canvas_container.onclick 	= function() {   start_init() }
}

function start_init() {
    m_screen.request_fullscreen(m_cont.get_container());
    main_canvas_container.onclick 	= function() {
      m_app.enable_camera_controls();
      m_nla.play();
    }
}
//**************  FINISH APPLICATION  *************************************************************************

}); // finish

// import the app module and start the app by calling the init method
b4w.require("B4W_ARSENAL_main").init();
