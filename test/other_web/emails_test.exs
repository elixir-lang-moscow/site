defmodule ElixirLangMoscow.EmailsTest do
  use ElixirLangMoscow.ModelCase

  alias ElixirLangMoscow.BaseTest
  alias ElixirLangMoscow.{Registration, SuggestedTalk, Event, Emails}

  setup do
    on_exit fn ->
      Repo.delete_all(Registration)
      Repo.delete_all(Event)
      Repo.delete_all(SuggestedTalk)
    end

    suggested_talk = BaseTest.create_suggested_talk()
    event = BaseTest.create_event()
    registration = BaseTest.create_registration(event)
    {:ok, %{
      event: event,
      registration: registration,
      suggested_talk: suggested_talk,
    }}
  end

  test "email is sent on valid registration", %{registration: reg} do
    email = Emails.create(reg, :registration_confirmation)
    {:ok, %{id: id}} = Emails.send_email(email)
    mailbox = Swoosh.Adapters.Local.Storage.Memory.all()

    assert Enum.any?(mailbox, fn(v) -> v.headers["Message-ID"] == id end)
  end

  test "email is sent on talk suggestion", %{suggested_talk: suggested_talk} do
    email = Emails.create(suggested_talk, :suggested_talk)
    {:ok, %{id: id}} = Emails.send_email(email)
    mailbox = Swoosh.Adapters.Local.Storage.Memory.all()

    assert Enum.any?(mailbox, fn(v) -> v.headers["Message-ID"] == id end)
  end
end
