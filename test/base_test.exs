defmodule ElixirLangMoscow.BaseTest do
  alias ElixirLangMoscow.Repo

  alias ElixirLangMoscow.Speaker
  alias ElixirLangMoscow.Event
  alias ElixirLangMoscow.Registration


  def valid_event do
    %{
      name: "some content",
      location: "some content",
      time_at: "2010-04-17 14:00:00",
      uid: "some-valid-value",
      registration_link: "http://somelink.com",
    }
  end
  def valid_speaker, do: %{name: "some content"}
  def valid_registration do
    %{
      company: "SomeCompany",
      first_name: "SomeName",
      last_name: "SomeSurname",
      email: "some@email.com",
      uid: "some-unique-uid",
      code: "some-unique-code",
      barcode: "some-unique-barcode",
      # event_id is set on demand, later on
    }
  end

  def create_speaker do
    Speaker.changeset(%Speaker{}, valid_speaker()) |> Repo.insert!
  end

  def create_event do
    Event.changeset(%Event{}, valid_event()) |> Repo.insert!
  end

  def create_registration do
    create_registration(create_event())
  end
  def create_registration(event) do
    data = Map.put(valid_registration(), :event_id, event.id)
    Registration.changeset(%Registration{}, data) |> Repo.insert!
  end

end
