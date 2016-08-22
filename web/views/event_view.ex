defmodule ElixirLangMoscow.EventView do
  use ElixirLangMoscow.Web, :view

  import ElixirLangMoscow.Utils, only: [pretty_time: 1]
  import ElixirLangMoscow.Partner, only: [image_url: 1]
end
