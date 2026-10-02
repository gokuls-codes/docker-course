package main

import "testing"

func TestBasic(t *testing.T) {
	got := 1 + 1
	expected := 2
	if got != expected {
		t.Errorf("got %d, expected %d", got, expected)
	}
}
