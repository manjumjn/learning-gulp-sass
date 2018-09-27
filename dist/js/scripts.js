document.addEventListener('DOMContentLoaded', function(){
    console.log('Hello, DOM has finished loading!');
});
document.getElementById('smart-link').addEventListener('click', function(){
    event.preventDefault();

    console.log('Hello there. You have clicked a link!');
});