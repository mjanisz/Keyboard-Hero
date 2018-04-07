/*
  Handles functions that are common across multiple files
 */

/*
  Checks to see if the button was clicked. Used mainly to
  check navigational buttons
 */
function isButtonClicked(x, y, button)
{
  return x > button.x - button.map.frame.w / 2 &&
    x < button.x + button.map.frame.w / 2 &&
    y > button.y - button.map.frame.h / 2 &&
    y < button.y + button.map.frame.h / 2;
}